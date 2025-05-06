// Configuration for the Sanity Test Reports Hub
// Automatically updated by GitHub Actions on 2025-05-06 17:19:30

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
        "lastUpdate": "2 minutes ago",
        "status": "success"
    },
    {
        "name": "loyalty-program",
        "description": "Loyal Program Suite",
        "url": "https://michael-iag.github.io/loyalty-program/",
        "stats": {
            "total": 7,
            "passed": 7,
            "failed": 0,
            "critical": 2
        },
        "lastUpdate": "1 minutes ago",
        "status": "success"
    }
];

// Calculate overall statistics
function calculateOverallStats() {
    return {
        repositories: 3,
        tests: 17,
        passed: 15,
        failed: 2,
        critical: 6,
        passRate: 88,
        lastUpdated: "2025-05-06T17:19:30+0100"
    };
}

const OVERALL_STATS = calculateOverallStats();
