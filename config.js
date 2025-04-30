// Configuration for the Sanity Test Reports Hub
// Automatically updated by GitHub Actions on 2025-04-30 10:55:43

const REPOSITORIES = [
    {
        "name": "sample-sanity-pipeline",
        "description": null,
        "url": "https://michael-iag.github.io/sample-sanity-pipeline/",
        "stats": {
            "total": 0,
            "passed": 0,
            "failed": 0,
            "critical": 0
        },
        "lastUpdate": "0 minutes ago",
        "status": "success"
    }
];

// Calculate overall statistics
function calculateOverallStats() {
    return {
        repositories: 1,
        tests: 0,
        passed: 0,
        failed: 0,
        critical: 0,
        passRate: 0,
        lastUpdated: "2025-04-30T10:55:43+0100"
    };
}

const OVERALL_STATS = calculateOverallStats();
