// Configuration for the Sanity Test Reports Hub
// Automatically updated by GitHub Actions on 2025-05-06 16:12:18

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
        "lastUpdate": "0 minutes ago",
        "status": "warning"
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
        lastUpdated: "2025-05-06T16:12:18+0100"
    };
}

const OVERALL_STATS = calculateOverallStats();
