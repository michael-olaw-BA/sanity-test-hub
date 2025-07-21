// Configuration for the Sanity Test Reports Hub
// Automatically updated by GitHub Actions on 2025-07-21 02:25:36

const REPOSITORIES = [
    {
        "name": "sample-sanity-pipeline",
        "description": "sample-sanity-pipeline sanity tests",
        "url": "https://michael-iag.github.io/sample-sanity-pipeline/",
        "stats": {
            "total": 0,
            "passed": 0,
            "failed": 0,
            "critical": 0
        },
        "lastUpdate": "Unknown",
        "lastUpdateTimestamp": null,
        "workflowStatus": "unknown"
    },
    {
        "name": "flight-search",
        "description": "flight-search sanity tests",
        "url": "https://michael-iag.github.io/flight-search/",
        "stats": {
            "total": 0,
            "passed": 0,
            "failed": 0,
            "critical": 0
        },
        "lastUpdate": "Unknown",
        "lastUpdateTimestamp": null,
        "workflowStatus": "unknown"
    },
    {
        "name": "booking-manager",
        "description": "booking-manager sanity tests",
        "url": "https://michael-iag.github.io/booking-manager/",
        "stats": {
            "total": 0,
            "passed": 0,
            "failed": 0,
            "critical": 0
        },
        "lastUpdate": "Unknown",
        "lastUpdateTimestamp": null,
        "workflowStatus": "unknown"
    },
    {
        "name": "loyalty-program",
        "description": "loyalty-program sanity tests",
        "url": "https://michael-iag.github.io/loyalty-program/",
        "stats": {
            "total": 0,
            "passed": 0,
            "failed": 0,
            "critical": 0
        },
        "lastUpdate": "Unknown",
        "lastUpdateTimestamp": null,
        "workflowStatus": "unknown"
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
        lastUpdated: "2025-07-21T02:25:36+0100"
    };
}

const OVERALL_STATS = calculateOverallStats();
