// Configuration for the Sanity Test Reports Hub
// Automatically updated by GitHub Actions on 2025-05-07 02:14:07

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
        "lastUpdateTimestamp": "2025-05-02T11:00:18Z",
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
        "lastUpdate": "6 hours ago",
        "lastUpdateTimestamp": "2025-05-06T18:58:05Z",
        "status": "success"
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
        "lastUpdate": "6 hours ago",
        "lastUpdateTimestamp": "2025-05-06T18:58:15Z",
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
        "lastUpdate": "6 hours ago",
        "lastUpdateTimestamp": "2025-05-06T18:58:13Z",
        "status": "success"
    }
];

// Calculate overall statistics
function calculateOverallStats() {
    return {
        repositories: 4,
        tests: 23,
        passed: 21,
        failed: 2,
        critical: 8,
        passRate: 91,
        lastUpdated: "2025-05-07T02:14:07+0100"
    };
}

const OVERALL_STATS = calculateOverallStats();
