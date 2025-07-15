// Configuration for the Sanity Test Reports Hub
// Automatically updated by GitHub Actions on 2025-07-15 02:23:27

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
        "lastUpdate": "10 weeks ago",
        "lastUpdateTimestamp": "2025-05-02T11:00:18Z",
        "workflowStatus": "success",
        "lastCommit": {
            "message": "Update Back to Hub button",
            "author": "Michael Olawuwo"
        }
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
        "lastUpdate": "8 weeks ago",
        "lastUpdateTimestamp": "2025-05-15T17:46:21Z",
        "workflowStatus": "success",
        "lastCommit": {
            "message": "Failed test simulations",
            "author": "Michael Olawuwo"
        }
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
        "lastUpdate": "Unknown",
        "lastUpdateTimestamp": null,
        "workflowStatus": "unknown",
        "lastCommit": {
            "message": "No commits found",
            "author": ""
        }
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
        tests: 13,
        passed: 13,
        failed: 0,
        critical: 5,
        passRate: 100,
        lastUpdated: "2025-07-15T02:23:27+0100"
    };
}

const OVERALL_STATS = calculateOverallStats();
