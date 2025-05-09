// Configuration for the Sanity Test Reports Hub
// Automatically updated by GitHub Actions on 2025-05-09 19:04:48

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
        "lastUpdate": "0 minutes ago",
        "lastUpdateTimestamp": "2025-05-09T18:04:12Z",
        "status": "warning"
    },
    {
        "name": "booking-manager",
        "description": "Booking Manager Suite",
        "url": "https://michael-iag.github.io/booking-manager/",
        "stats": {
            "total": 6,
            "passed": 6,
            "failed": 0,
            "critical": 2
        },
        "lastUpdate": "39 minutes ago",
        "lastUpdateTimestamp": "2025-05-09T17:25:43Z",
        "status": "success"
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
        "lastUpdate": "0 minutes ago",
        "lastUpdateTimestamp": "2025-05-09T18:04:46Z",
        "status": "warning"
    }
];

// Calculate overall statistics
function calculateOverallStats() {
    return {
        repositories: 4,
        tests: 6,
        passed: 6,
        failed: 0,
        critical: 2,
        passRate: 100,
        lastUpdated: "2025-05-09T19:04:48+0100"
    };
}

const OVERALL_STATS = calculateOverallStats();
