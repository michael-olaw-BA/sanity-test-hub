// Configuration for the Sanity Test Reports Hub
// Automatically updated by GitHub Actions on 2025-05-06 02:13:24

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
        "lastUpdate": "3 days ago",
        "status": "success"
    },
    {
        "name": "flight-search",
        "description": "Flight search",
        "url": "https://michael-iag.github.io/flight-search/",
        "stats": {
            "total": 7,
            "passed": 2,
            "failed": 5,
            "critical": 3
        },
        "lastUpdate": "3 days ago",
        "status": "success"
    }
];

// Calculate overall statistics
function calculateOverallStats() {
    return {
        repositories: 2,
        tests: 10,
        passed: 3,
        failed: 7,
        critical: 4,
        passRate: 30,
        lastUpdated: "2025-05-06T02:13:24+0100"
    };
}

const OVERALL_STATS = calculateOverallStats();
