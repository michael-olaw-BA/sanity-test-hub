// Configuration for the Sanity Test Reports Hub
// Automatically updated by GitHub Actions on 2025-05-02 19:07:43

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
        "lastUpdate": "7 hours ago",
        "status": "success"
    },
    {
        "name": "flight-search",
        "description": "Flight search",
        "url": "https://michael-iag.github.io/flight-search/",
        "stats": {
            "total": 0,
            "passed": 0,
            "failed": 0,
            "critical": 0
        },
        "lastUpdate": "5 minutes ago",
        "status": "success"
    }
];

// Calculate overall statistics
function calculateOverallStats() {
    return {
        repositories: 2,
        tests: 3,
        passed: 1,
        failed: 2,
        critical: 1,
        passRate: 33,
        lastUpdated: "2025-05-02T19:07:43+0100"
    };
}

const OVERALL_STATS = calculateOverallStats();
