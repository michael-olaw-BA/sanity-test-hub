// Configuration for the Sanity Test Reports Hub
// Automatically updated by GitHub Actions on 2025-05-12 13:55:09

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
        "lastUpdate": "1 weeks ago",
        "lastUpdateTimestamp": "2025-05-02T11:00:18Z",
        "workflowStatus": "success"
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
        "lastUpdateTimestamp": "2025-05-12T12:55:00Z",
        "workflowStatus": "cancelled"
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
        "lastUpdate": "2 days ago",
        "lastUpdateTimestamp": "2025-05-09T17:25:43Z",
        "workflowStatus": "success"
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
        "lastUpdate": "2 days ago",
        "lastUpdateTimestamp": "2025-05-09T18:05:07Z",
        "workflowStatus": "success"
    }
];

// Calculate overall statistics
function calculateOverallStats() {
    return {
        repositories: 4,
        tests: 20,
        passed: 20,
        failed: 0,
        critical: 7,
        passRate: 100,
        lastUpdated: "2025-05-12T13:55:09+0100"
    };
}

const OVERALL_STATS = calculateOverallStats();
