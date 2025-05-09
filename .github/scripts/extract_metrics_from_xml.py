import requests
import json
import datetime
import pytz  # Add this import for timezone support
import re
import os
import time
import xml.etree.ElementTree as ET

# List of repositories to monitor
repositories = [
    {"owner": "michael-iag", "repo": "sample-sanity-pipeline"},
    {"owner": "michael-iag", "repo": "flight-search"},
    {"owner": "michael-iag", "repo": "booking-manager"},
    {"owner": "michael-iag", "repo": "loyalty-program"},

    # Add other repositories as needed
]

# GitHub token for API access (optional, increases rate limit)
github_token = os.environ.get('GITHUB_TOKEN', '')
headers = {}
if github_token:
    headers['Authorization'] = f'token {github_token}'

repo_data = []

def extract_metrics_from_xml(xml_content):
    """Extract test metrics from JUnit XML content"""
    try:
        root = ET.fromstring(xml_content)
        
        # Count test cases
        testcases = root.findall('.//testcase')
        total_tests = len(testcases)
        
        # Count failed and skipped tests
        failures = root.findall('.//testcase/failure')
        errors = root.findall('.//testcase/error')
        skipped = root.findall('.//testcase/skipped')
        failed_tests = len(failures) + len(errors) + len(skipped)
        
        # Count critical tests by searching system-out for @critical tag
        critical_tests = 0
        for testcase in testcases:
            sysout = testcase.find('system-out')
            if sysout is not None and sysout.text and '@critical' in sysout.text:
                critical_tests += 1
        
        # Calculate passed tests
        passed_tests = total_tests - failed_tests
        
        return {
            "total_tests": total_tests,
            "passed_tests": passed_tests,
            "failed_tests": failed_tests,
            "critical_tests_count": critical_tests
        }
    except Exception as e:
        print(f"  Error parsing XML: {e}")
        return None

def fetch_junit_xml(repo_name, owner):
    """Fetch JUnit XML files from GitHub Pages for the given repository"""
    base_url = f"https://{owner}.github.io/{repo_name}/"
    
    # Convert hyphens to underscores for XML filename patterns
    repo_name_underscore = repo_name.replace('-', '_')
    
    # Common patterns for JUnit XML files
    xml_patterns = [
        f"TESTS-{repo_name_underscore}.xml",
        f"TEST-{repo_name_underscore}.xml",
        f"junit-{repo_name_underscore}.xml",
        "junit.xml",
        # Add more patterns as needed
    ]
    
    xml_contents = []
    
    # Try each pattern directly
    for pattern in xml_patterns:
        xml_url = f"{base_url}{pattern}?t={int(time.time())}"
        print(f"  Trying XML URL: {xml_url}")
        
        try:
            xml_response = requests.get(xml_url, timeout=10)
            if xml_response.status_code == 200:
                print(f"  Successfully fetched {pattern}")
                xml_contents.append(xml_response.text)
            else:
                print(f"  Failed to fetch {pattern}: HTTP {xml_response.status_code}")
        except Exception as e:
            print(f"  Error fetching {pattern}: {e}")
    
    return xml_contents

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
        
        # Try to fetch JUnit XML files from GitHub Pages
        xml_contents = fetch_junit_xml(repo, owner)
        
        total_tests = 0
        passed_tests = 0
        failed_tests = 0
        critical_tests = 0
        
        if xml_contents:
            print(f"  Found {len(xml_contents)} XML files")
            
            # Process each XML file
            for xml_content in xml_contents:
                # Extract metrics from the XML
                metrics = extract_metrics_from_xml(xml_content)
                
                if metrics:
                    print(f"  Parsed XML successfully: {metrics}")
                    total_tests += metrics["total_tests"]
                    passed_tests += metrics["passed_tests"]
                    failed_tests += metrics["failed_tests"]
                    critical_tests += metrics["critical_tests_count"]
        else:
            print(f"  No XML files found")
        
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
                # Store the ISO timestamp for JavaScript
                iso_timestamp = updated_at
                
                # Calculate time since update (keep this for backward compatibility)
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
            iso_timestamp = None
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
            "lastUpdateTimestamp": iso_timestamp,
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