// Configuration for the Sanity Test Reports Hub
// Automatically updated by GitHub Actions on 2025-05-02 19:36:37

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
            "total": 7,
            "passed": 7,
            "failed": 0,
            "critical": 3
        },
        "lastUpdate": "11 minutes ago",
        "status": "success"
    }
];

// Calculate overall statistics
function calculateOverallStats() {
    return {
        repositories: 2,
        tests: 10,
        passed: 8,
        failed: 2,
        critical: 4,
        passRate: 80,
        lastUpdated: "2025-05-02T19:36:37+0100"
    };
}

const OVERALL_STATS = calculateOverallStats();
