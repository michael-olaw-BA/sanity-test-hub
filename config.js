// Configuration for the Sanity Test Reports Hub
// Automatically updated by GitHub Actions on 2025-05-09 18:25:09

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
        "lastUpdate": "7 days ago",
        "lastUpdateTimestamp": "2025-05-02T11:00:18Z",
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
        "lastUpdate": "2 days ago",
        "lastUpdateTimestamp": "2025-05-06T18:58:05Z",
        "status": "success"
    },
    {
        "name": "booking-manager",
        "description": "Booking Manager Suite",
        "url": "https://michael-iag.github.io/booking-manager/",
        "stats": {
            "total": 0,
            "passed": 0,
            "failed": 0,
            "critical": 0
        },
        "lastUpdate": "0 minutes ago",
        "lastUpdateTimestamp": "2025-05-09T17:24:33Z",
        "status": "warning"
    },
    {
        "name": "loyalty-program",
        "description": "Loyal Program Suite",
        "url": "https://michael-iag.github.io/loyalty-program/",
        "stats": {
            "total": 0,
            "passed": 0,
            "failed": 0,
            "critical": 0
        },
        "lastUpdate": "2 days ago",
        "lastUpdateTimestamp": "2025-05-06T18:58:13Z",
        "status": "success"
    }
];

// Calculate overall statistics
function calculateOverallStats() {
    return {
        repositories: 4,
        tests: 0,
        passed: 0,
        failed: 0,
        critical: 0,
        passRate: 0,
        lastUpdated: "2025-05-09T18:25:09+0100"
    };
}

const OVERALL_STATS = calculateOverallStats();
