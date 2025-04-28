// Configuration for the Sanity Test Reports Hub
// Automatically updated by GitHub Actions on 2025-04-28 02:14:24

const REPOSITORIES = [
    {
        "name": "sample-sanity-pipeline",
        "description": null,
        "url": "https://michael-iag.github.io/sample-sanity-pipeline/",
        "stats": {
            "total": 3,
            "passed": 1,
            "failed": 2,
            "critical": 1
        },
        "lastUpdate": "4 days ago",
        "status": "success"
    }
];

// Calculate overall statistics
function calculateOverallStats() {
    return {
        repositories: 1,
        tests: 3,
        passed: 1,
        failed: 2,
        critical: 1,
        passRate: 33,
        lastUpdated: "2025-04-28T02:14:24+0100"
    };
}

const OVERALL_STATS = calculateOverallStats();
