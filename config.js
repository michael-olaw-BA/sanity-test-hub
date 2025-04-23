// Configuration for the Sanity Test Reports Hub
<<<<<<< HEAD
// Automatically updated by GitHub Actions on 2025-04-23 16:31:19
=======
// Automatically updated by GitHub Actions on 2025-04-23 14:31:51
>>>>>>> 0cd5510a99eb081ed76151b1c08a3bbd974cb5b0

const REPOSITORIES = [
    {
        "name": "sample-sanity-pipeline",
        "description": null,
<<<<<<< HEAD
        "url": "https://michael-iag.github.io/sample-sanity-pipeline/",
=======
        "url": "https://mik3ola.github.io/sample-sanity-pipeline/",
>>>>>>> 0cd5510a99eb081ed76151b1c08a3bbd974cb5b0
        "stats": {
            "total": 3,
            "passed": 2,
            "failed": 1,
            "critical": 1
        },
<<<<<<< HEAD
        "lastUpdate": "4 hours ago",
=======
        "lastUpdate": "2 days ago",
>>>>>>> 0cd5510a99eb081ed76151b1c08a3bbd974cb5b0
        "status": "success"
    }
];

// Calculate overall statistics
function calculateOverallStats() {
    return {
        repositories: 1,
        tests: 3,
        passed: 2,
        failed: 1,
        critical: 1,
<<<<<<< HEAD
        passRate: 67,
        lastUpdated: "2025-04-23 16:31:19"
=======
        passRate: 67
>>>>>>> 0cd5510a99eb081ed76151b1c08a3bbd974cb5b0
    };
}

const OVERALL_STATS = calculateOverallStats();
