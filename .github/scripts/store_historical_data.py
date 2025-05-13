import sqlite3
import os
from datetime import datetime
import json
import logging
from github import Github
import sys

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('build_history')

def initialize_db():
    """Create the database and tables if they don't exist"""
    db_dir = "data"
    os.makedirs(db_dir, exist_ok=True)
    
    conn = sqlite3.connect(os.path.join(db_dir, 'test_metrics.db'))
    c = conn.cursor()
    
    # Create main test runs table
    c.execute('''
    CREATE TABLE IF NOT EXISTS test_runs (
        id INTEGER PRIMARY KEY,
        repository TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        total INTEGER NOT NULL,
        passed INTEGER NOT NULL,
        failed INTEGER NOT NULL,
        skipped INTEGER,
        duration REAL,
        pass_rate REAL,
        build_id TEXT,
        commit_hash TEXT
    )
    ''')
    
    # Create table for test-level details (optional)
    c.execute('''
    CREATE TABLE IF NOT EXISTS test_details (
        id INTEGER PRIMARY KEY,
        run_id INTEGER,
        test_name TEXT NOT NULL,
        status TEXT NOT NULL,
        duration REAL,
        is_critical BOOLEAN,
        error_message TEXT,
        FOREIGN KEY (run_id) REFERENCES test_runs (id)
    )
    ''')
    
    conn.commit()
    conn.close()

def store_historical_data(repository, test_results):
    """Store test results in SQLite database"""
    initialize_db()
    
    conn = sqlite3.connect('data/test_metrics.db')
    c = conn.cursor()
    
    # Calculate pass rate
    pass_rate = (test_results["passed"] / test_results["total"]) * 100 if test_results["total"] > 0 else 0
    
    # Insert run data
    c.execute('''
    INSERT INTO test_runs (
        repository, timestamp, total, passed, failed, 
        skipped, duration, pass_rate, build_id, commit_hash
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        repository,
        datetime.now().isoformat(),
        test_results["total"],
        test_results["passed"],
        test_results["failed"],
        test_results.get("skipped", 0),
        test_results.get("duration", 0),
        pass_rate,
        test_results.get("build_id"),
        test_results.get("commit_hash")
    ))
    
    run_id = c.lastrowid
    
    # If there are individual test details, store them too
    if "tests" in test_results:
        for test in test_results["tests"]:
            c.execute('''
            INSERT INTO test_details (
                run_id, test_name, status, duration, is_critical, error_message
            ) VALUES (?, ?, ?, ?, ?, ?)
            ''', (
                run_id,
                test["name"],
                test["status"],
                test.get("duration", 0),
                test.get("is_critical", False),
                test.get("error_message")
            ))
    
    conn.commit()
    conn.close()
    
    return run_id

def store_build_history(token, repo_name):
    """Store build status history for a repository"""
    g = Github(token)
    repo = g.get_repo(repo_name)
    
    logger.info(f"Collecting build history for {repo_name}")
    
    # Get workflow runs
    workflow_runs = repo.get_workflow_runs()
    
    # Create history data structure
    history_data = []
    
    for run in workflow_runs:
        # Skip GitHub Pages builds and other automated builds
        if should_exclude_build(run):
            continue
            
        # Extract the key information
        try:
            # Calculate duration safely
            duration = 0
            if run.updated_at and run.created_at:
                duration = (run.updated_at - run.created_at).total_seconds()
                
            # Get commit message safely
            commit_message = "No message"
            if run.head_commit and hasattr(run.head_commit, 'message'):
                commit_message = run.head_commit.message
                
            history_data.append({
                'run_id': run.id,
                'timestamp': run.created_at.isoformat(),
                'status': run.conclusion,  # success, failure, cancelled, etc.
                'branch': run.head_branch,
                'commit_id': run.head_sha,
                'commit_message': commit_message,
                'duration': duration,
                'actor': run.actor.login if run.actor else "Unknown"
            })
        except Exception as e:
            logger.error(f"Error processing run {run.id}: {str(e)}")
            continue
    
    # Store the data
    history_dir = 'data/history'
    os.makedirs(history_dir, exist_ok=True)
    
    filename = f"{history_dir}/{repo_name.replace('/', '_')}_build_history.json"
    logger.info(f"Saving build history to {filename}")
    
    # Append to existing data if file exists
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            existing_data = json.load(f)
            
        # Filter out duplicates based on run_id
        existing_run_ids = set(item['run_id'] for item in existing_data)
        new_items = [item for item in history_data if item['run_id'] not in existing_run_ids]
        
        logger.info(f"Adding {len(new_items)} new build records to existing {len(existing_data)}")
        
        # Combine and save
        combined_data = existing_data + new_items
        with open(filename, 'w') as f:
            json.dump(combined_data, f, indent=2)
    else:
        logger.info(f"Creating new build history file with {len(history_data)} records")
        # Create new file
        with open(filename, 'w') as f:
            json.dump(history_data, f, indent=2)
    
    return len(history_data)

def should_exclude_build(run):
    """Determine if this build should be excluded from analytics"""
    # Exclude GitHub Pages automated builds
    if run.actor and run.actor.login in ["github-pages[bot]", "github-actions[bot]"]:
        return True
        
    # Exclude based on workflow name
    if run.workflow and "pages" in run.workflow.name.lower():
        # Only exclude if it's the pages deployment workflow, not test workflows
        if "deploy" in run.workflow.name.lower():
            return True
    
    # Exclude any build that isn't testing or building code
    if run.workflow and any(term in run.workflow.name.lower() for term in ["deploy", "publish", "release"]):
        # But keep if it also includes testing terms
        if not any(term in run.workflow.name.lower() for term in ["test", "lint", "check"]):
            return True
    
    return False

def main():
    # Setup logging
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger('build_history')
    
    token = os.environ.get('GITHUB_TOKEN')
    if not token:
        logger.error("GITHUB_TOKEN not provided")
        sys.exit(1)
        
    # Read repositories from config.js
    with open('config.js', 'r') as f:
        config_content = f.read()
        
    # Parse repositories list from config.js
    repos = []
    # Simple parsing to extract repository names
    try:
        repos_section = config_content.split('REPOSITORIES = [')[1].split('];')[0]
        repo_blocks = repos_section.split('{')
        for block in repo_blocks:
            if '"name":' in block:
                name = block.split('"name":')[1].split(',')[0].strip().strip('"')
                if name:
                    repos.append(f"michael-iag/{name}")
    except Exception as e:
        logger.error(f"Failed to parse config.js: {e}")
        
    if not repos:
        logger.error("No repositories found in config.js")
        sys.exit(1)
        
    # Process each repository
    all_history = []
    for repo_name in repos:
        logger.info(f"Processing repository: {repo_name}")
        history = store_build_history(token, repo_name)
        all_history.extend(history)
    
    # Save combined history
    history_dir = 'data/history'
    os.makedirs(history_dir, exist_ok=True)
    combined_file = f"{history_dir}/build_history_combined.json"
    
    logger.info(f"Saving combined history to {combined_file}")
    with open(combined_file, 'w') as f:
        json.dump(all_history, f, indent=2)

if __name__ == "__main__":
    main()