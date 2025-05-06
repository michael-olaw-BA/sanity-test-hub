// Configuration for the Sanity Test Reports Hub
<<<<<<< HEAD
// Automatically updated by GitHub Actions on 2025-05-06 19:55:17
=======
// Automatically updated by GitHub Actions on 2025-05-06 19:57:58
>>>>>>> 4752a8cf8882c47c44a5f24d6390eeab68259e49

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
<<<<<<< HEAD
        "lastUpdate": "2 hours ago",
        "lastUpdateTimestamp": "2025-05-06T16:17:06Z",
        "status": "success"
=======
        "lastUpdate": "0 minutes ago",
        "status": "warning"
>>>>>>> 4752a8cf8882c47c44a5f24d6390eeab68259e49
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
<<<<<<< HEAD
        "lastUpdate": "2 hours ago",
        "lastUpdateTimestamp": "2025-05-06T16:38:23Z",
        "status": "success"
=======
        "lastUpdate": "0 minutes ago",
        "status": "warning"
>>>>>>> 4752a8cf8882c47c44a5f24d6390eeab68259e49
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
<<<<<<< HEAD
        "lastUpdate": "2 hours ago",
        "lastUpdateTimestamp": "2025-05-06T16:17:58Z",
        "status": "success"
=======
        "lastUpdate": "0 minutes ago",
        "status": "warning"
>>>>>>> 4752a8cf8882c47c44a5f24d6390eeab68259e49
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
<<<<<<< HEAD
        lastUpdated: "2025-05-06T19:55:17+0100"
=======
        lastUpdated: "2025-05-06T19:57:58+0100"
>>>>>>> 4752a8cf8882c47c44a5f24d6390eeab68259e49
    };
}

const OVERALL_STATS = calculateOverallStats();
