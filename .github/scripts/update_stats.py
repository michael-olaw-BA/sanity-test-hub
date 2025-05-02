import requests
import json
import datetime
import pytz  # Add this import for timezone support
import re
import os

# List of repositories to monitor
repositories = [
    {"owner": "michael-iag", "repo": "sample-sanity-pipeline"},
    {"owner": "michael-iag", "repo": "flight-search"},
    #{"owner": "michael-iag", "repo": "booking-manager"},
    #{"owner": "michael-iag", "repo": "loyalty-program"},
    #{"owner": "michael-iag", "repo": "api-sanity-tests"},

    # Add other repositories as needed
]

# GitHub token for API access (optional, increases rate limit)
github_token = os.environ.get('GITHUB_TOKEN', '')
headers = {}
if github_token:
    headers['Authorization'] = f'token {github_token}'

repo_data = []

for repo_info in repositories:
    owner = repo_info["owner"]
    repo = repo_info["repo"]
    
    print(f"Processing repository: {owner}/{repo}")
    
    try:
        # Fetch repository info from GitHub API
        api_url = f"https://api.github.com/repos/{owner}/{repo}"
        response = requests.get(api_url, headers=headers)
        
        # Check if repository exists
        if response.status_code != 200:
            print(f"  Repository {owner}/{repo} not found. Using default values.")
            # Add default values
            repo_data.append({
                "name": repo,
                "description": f"{repo} sanity tests",
                "url": f"https://{owner}.github.io/{repo}/",
                "stats": {
                    "total": 0,
                    "passed": 0,
                    "failed": 0,
                    "critical": 0
                },
                "lastUpdate": "Unknown",
                "status": "warning"
            })
            continue
            
        repo_data_api = response.json()
        
        # Get repository description
        description = repo_data_api.get('description', f"{repo} sanity tests")
        
        # Try to fetch metrics.json from GitHub Pages
        metrics_url = f"https://{owner}.github.io/{repo}/metrics.json"
        print(f"Fetching metrics from: {metrics_url}")
        
        try:
            metrics_response = requests.get(metrics_url)
            # Check if request was successful
            if metrics_response.status_code != 200:
                raise Exception(f"HTTP Error: {metrics_response.status_code}")
                
            metrics = metrics_response.json()
            
            total_tests = metrics.get("total_tests", 0)
            passed_tests = metrics.get("passed_tests", 0)
            failed_tests = metrics.get("failed_tests", 0)
            critical_tests = metrics.get("critical_tests_count", 0)
        except Exception as e:
            print(f"  Error fetching metrics, using default values: {e}")
            # Default values if metrics.json is not available
            total_tests = 0
            passed_tests = 0
            failed_tests = 0
            critical_tests = 0
        
        # Get latest workflow run
        runs_url = f"https://api.github.com/repos/{owner}/{repo}/actions/runs"
        runs_response = requests.get(runs_url, headers=headers)
        runs_data = runs_response.json()
        
        # Default values
        last_update = "Unknown"
        status = "warning"
        
        if runs_data.get("workflow_runs") and len(runs_data["workflow_runs"]) > 0:
            latest_run = runs_data["workflow_runs"][0]
            updated_at = latest_run.get("updated_at")
            
            if updated_at:
                # Calculate time since update
                updated_date = datetime.datetime.fromisoformat(updated_at.replace("Z", "+00:00"))
                now = datetime.datetime.now(datetime.timezone.utc)
                diff = now - updated_date
                
                if diff.days > 7:
                    last_update = f"{diff.days // 7} weeks ago"
                elif diff.days > 0:
                    last_update = f"{diff.days} days ago"
                elif diff.seconds // 3600 > 0:
                    last_update = f"{diff.seconds // 3600} hours ago"
                else:
                    last_update = f"{diff.seconds // 60} minutes ago"
            
            # Determine status
            conclusion = latest_run.get("conclusion")
            if conclusion == "success":
                status = "success"
            elif conclusion == "failure":
                status = "danger"
            else:
                status = "warning"
        else:
            # Default values when no workflow runs found
            last_update = "Unknown"
            status = "warning"
        
        # Add repository data
        repo_data.append({
            "name": repo,
            "description": description,
            "url": f"https://{owner}.github.io/{repo}/",
            "stats": {
                "total": total_tests,
                "passed": passed_tests,
                "failed": failed_tests,
                "critical": critical_tests
            },
            "lastUpdate": last_update,
            "status": status
        })
        
        print(f"  Successfully processed {repo}")
        
    except Exception as e:
        print(f"Error processing {repo}: {e}")
        # Add with default values if there's an error
        repo_data.append({
            "name": repo,
            "description": f"{repo} sanity tests",
            "url": f"https://{owner}.github.io/{repo}/",
            "stats": {
                "total": 0,
                "passed": 0,
                "failed": 0,
                "critical": 0
            },
            "lastUpdate": "Unknown",
            "status": "warning"
        })

# Calculate overall statistics
total_repos = len(repo_data)
total_tests = sum(repo["stats"]["total"] for repo in repo_data)
total_passed = sum(repo["stats"]["passed"] for repo in repo_data)
total_failed = sum(repo["stats"]["failed"] for repo in repo_data)
total_critical = sum(repo["stats"]["critical"] for repo in repo_data)
pass_rate = 0 if total_tests == 0 else round((total_passed / total_tests) * 100)

# Get current time in London timezone with ISO format for JavaScript compatibility
london_tz = pytz.timezone('Europe/London')
now = datetime.datetime.now(london_tz)
# ISO format for JS parsing
current_time_iso = now.strftime('%Y-%m-%dT%H:%M:%S%z')
# Human readable format for display
current_time_display = now.strftime('%Y-%m-%d %H:%M:%S')

# Update config.js
print("Updating config.js...")

# Create new config.js content
config_content = f"""// Configuration for the Sanity Test Reports Hub
// Automatically updated by GitHub Actions on {current_time_display}

const REPOSITORIES = {json.dumps(repo_data, indent=4)};

// Calculate overall statistics
function calculateOverallStats() {{
    return {{
        repositories: {total_repos},
        tests: {total_tests},
        passed: {total_passed},
        failed: {total_failed},
        critical: {total_critical},
        passRate: {pass_rate},
        lastUpdated: "{current_time_iso}"
    }};
}}

const OVERALL_STATS = calculateOverallStats();
"""

with open("config.js", "w") as f:
    f.write(config_content)

print("config.js updated successfully") 