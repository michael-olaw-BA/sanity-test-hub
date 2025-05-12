// Configuration for the Sanity Test Reports Hub
// Automatically updated by GitHub Actions on 2025-05-12 16:10:48

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
        "lastUpdate": "0 minutes ago",
        "lastUpdateTimestamp": "2025-05-12T15:10:21Z",
        "workflowStatus": "success",
        "lastCommit": {
            "message": "Add manual triggering to workflow file",
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
        "lastUpdate": "2 days ago",
        "lastUpdateTimestamp": "2025-05-09T17:25:43Z",
        "workflowStatus": "success",
        "lastCommit": {
            "message": "Update workflow to push xml for hub",
            "author": "Michael Olawuwo"
        }
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
        "workflowStatus": "success",
        "lastCommit": {
            "message": "Add xml upload to workflow",
            "author": "Michael Olawuwo"
        }
    }
];

// Calculate overall statistics
function calculateOverallStats() {
    // Count repositories with tests
    const reposWithTests = REPOSITORIES.filter(repo => repo.stats.total > 0).length;
    
    // Calculate total tests, passed, and failed
    const totalTests = REPOSITORIES.reduce((sum, repo) => sum + repo.stats.total, 0);
    const totalPassed = REPOSITORIES.reduce((sum, repo) => sum + repo.stats.passed, 0);
    const totalFailed = REPOSITORIES.reduce((sum, repo) => sum + repo.stats.failed, 0);
    const totalCritical = REPOSITORIES.reduce((sum, repo) => sum + repo.stats.critical, 0);
    
    // Calculate pass rate only for repositories that have tests
    const passRate = totalTests > 0 ? Math.round((totalPassed / totalTests) * 100) : 'N/A';
    
    return {
        repositories: REPOSITORIES.length,
        repositoriesWithTests: reposWithTests,
        tests: totalTests,
        passed: totalPassed,
        failed: totalFailed,
        critical: totalCritical,
        passRate: passRate,
        lastUpdated: "2025-05-12T14:12:42+0100"
    };
}

const OVERALL_STATS = calculateOverallStats();
