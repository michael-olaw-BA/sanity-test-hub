// Configuration for the Sanity Test Reports Hub
// Add or modify repositories as needed

const REPOSITORIES = [
    {
        name: "sample-sanity-pipeline",
        description: "Sample sanity test pipeline with metrics dashboard",
        url: "https://mik3ola.github.io/sample-sanity-pipeline/",
        stats: {
            total: 3,
            passed: 2,
            failed: 1,
            critical: 1
        },
        lastUpdate: "2 hours ago",
        status: "warning" // success, warning, danger
    },
    {
        name: "api-sanity-tests",
        description: "API endpoint sanity testing framework",
        url: "https://mik3ola.github.io/api-sanity-tests/",
        stats: {
            total: 12,
            passed: 10,
            failed: 2,
            critical: 3
        },
        lastUpdate: "1 day ago",
        status: "warning"
    },
    {
        name: "frontend-sanity-checks",
        description: "Frontend component sanity testing",
        url: "https://mik3ola.github.io/frontend-sanity-checks/",
        stats: {
            total: 8,
            passed: 8,
            failed: 0,
            critical: 2
        },
        lastUpdate: "3 days ago",
        status: "success"
    },
    {
        name: "database-sanity-tests",
        description: "Database connection and query sanity tests",
        url: "https://mik3ola.github.io/database-sanity-tests/",
        stats: {
            total: 5,
            passed: 3,
            failed: 2,
            critical: 2
        },
        lastUpdate: "5 days ago",
        status: "danger"
    },
    {
        name: "integration-sanity-suite",
        description: "Integration testing sanity suite",
        url: "https://mik3ola.github.io/integration-sanity-suite/",
        stats: {
            total: 15,
            passed: 12,
            failed: 3,
            critical: 4
        },
        lastUpdate: "1 week ago",
        status: "warning"
    }
];

// Calculate overall statistics
function calculateOverallStats() {
    let totalRepos = REPOSITORIES.length;
    let totalTests = 0;
    let totalPassed = 0;
    let totalFailed = 0;
    let totalCritical = 0;
    
    REPOSITORIES.forEach(repo => {
        totalTests += repo.stats.total;
        totalPassed += repo.stats.passed;
        totalFailed += repo.stats.failed;
        totalCritical += repo.stats.critical;
    });
    
    const passRate = totalTests > 0 ? Math.round((totalPassed / totalTests) * 100) : 0;
    
    return {
        repositories: totalRepos,
        tests: totalTests,
        passed: totalPassed,
        failed: totalFailed,
        critical: totalCritical,
        passRate: passRate
    };
}

const OVERALL_STATS = calculateOverallStats();
