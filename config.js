// Configuration for the Sanity Test Reports Hub
// Automatically updated by GitHub Actions on 2025-11-23 01:24:19

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
        "lastUpdate": "6 weeks ago",
        "lastUpdateTimestamp": "2025-10-08T10:08:33Z",
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
            "total": 0,
            "passed": 0,
            "failed": 0,
            "critical": 0
        },
        "lastUpdate": "Unknown",
        "lastUpdateTimestamp": null,
        "workflowStatus": "unknown",
        "lastCommit": {
            "message": "Failed test simulations",
            "author": "Michael Olawuwo"
        }
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
        lastUpdated: "2025-11-23T01:24:19+0000"
    };
}

const OVERALL_STATS = calculateOverallStats();
