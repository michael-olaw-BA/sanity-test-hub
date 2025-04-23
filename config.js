// Configuration for the Sanity Test Reports Hub
// Automatically updated by GitHub Actions on 2025-04-23 11:47:02

// Extract current repository owner for dynamic URLs
const REPO_OWNER = window.location.hostname.split('.')[0];

const REPOSITORIES = [
    {
        "name": "sample-sanity-pipeline",
        "description": null,
        "url": "https://michael-iag.github.io/sample-sanity-pipeline/",
        "stats": {
            "total": 3,
            "passed": 2,
            "failed": 1,
            "critical": 1
        },
        "lastUpdate": "50 minutes ago",
        "status": "success"
    }
];

// Calculate overall statistics
function calculateOverallStats() {
    return {
        repositories: 1,
        tests: 3,
        passed: 2,
        failed: 1,
        critical: 1,
        passRate: 67,
        lastUpdated: "2025-04-23 11:47:02"
    };
}

const OVERALL_STATS = calculateOverallStats();
