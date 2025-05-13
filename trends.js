// This file will handle fetching data and updating charts
// In a production environment, this would connect to your metrics API

document.addEventListener('DOMContentLoaded', function() {
    // Fetch metrics data from the API endpoint
    // For now we'll use mock data
    const mockData = getMockData();
    
    // Initialize charts with the data
    initializeCharts(mockData);
});

function getMockData() {
    // Generate 30 days of mock data
    const today = new Date();
    const data = [];
    
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        
        // Create a random trend with some consistency
        const basePassRate = 85 + Math.random() * 10 - 5;
        const passRate = Math.min(98, Math.max(75, basePassRate));
        
        const totalTests = Math.round(120 + Math.random() * 20);
        const passedTests = Math.round(totalTests * (passRate / 100));
        const failedTests = totalTests - passedTests;
        
        data.push({
            date: date.toISOString().split('T')[0],
            passRate: passRate,
            totalTests: totalTests,
            passedTests: passedTests,
            failedTests: failedTests,
            criticalTests: Math.round(totalTests * 0.3),
            duration: 2 + Math.random() * 2,
            repositories: [
                { name: "Booking Manager", passRate: 80 + Math.random() * 15, duration: 2.5 + Math.random() },
                { name: "API Gateway", passRate: 90 + Math.random() * 8, duration: 1.8 + Math.random() },
                { name: "User Service", passRate: 85 + Math.random() * 10, duration: 3.2 + Math.random() },
                { name: "Payment Service", passRate: 88 + Math.random() * 10, duration: 2.1 + Math.random() },
                { name: "Notification Service", passRate: 92 + Math.random() * 6, duration: 1.5 + Math.random() }
            ]
        });
    }
    
    return data;
}

function initializeCharts(data) {
    // Extract labels (dates) for the charts
    const labels = data.map(item => {
        const date = new Date(item.date);
        return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
    });
    
    // Extract data for each chart
    const passRates = data.map(item => item.passRate);
    const totalTests = data.map(item => item.totalTests);
    const passedTests = data.map(item => item.passedTests);
    const failedTests = data.map(item => item.failedTests);
    const durations = data.map(item => item.duration);
    
    // Initialize pass rate chart
    initPassRateChart(labels, passRates);
    
    // Initialize test count chart
    initTestCountChart(labels.slice(-7), 
                      totalTests.slice(-7), 
                      passedTests.slice(-7), 
                      failedTests.slice(-7));
    
    // Initialize duration chart using the latest data
    const latestData = data[data.length - 1];
    initDurationChart(
        latestData.repositories.map(repo => repo.name),
        latestData.repositories.map(repo => repo.duration)
    );
    
    // More charts would be initialized here
}

function initPassRateChart(labels, data) {
    const ctx = document.getElementById('passRateChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Overall Pass Rate (%)',
                data: data,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Pass Rate Trend (Last 30 Days)'
                }
            },
            scales: {
                y: {
                    min: 70,
                    max: 100
                }
            }
        }
    });
}

function initTestCountChart(labels, total, passed, failed) {
    const ctx = document.getElementById('testCountChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Tests',
                data: total,
                backgroundColor: '#3498db'
            }, {
                label: 'Passed Tests',
                data: passed,
                backgroundColor: '#2ecc71'
            }, {
                label: 'Failed Tests',
                data: failed,
                backgroundColor: '#e74c3c'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Test Results (Last 7 Days)'
                }
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        }
    });
}

function initDurationChart(labels, data) {
    const ctx = document.getElementById('testDurationChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Average Test Duration (seconds)',
                data: data,
                backgroundColor: '#2ecc71'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Average Test Duration by Repository'
                }
            }
        }
    });
}

// Function to create the build status chart
function createBuildStatusChart(buildData, timeRange) {
    console.log("Creating build status chart with", buildData.length, "records");
    
    // Filter data based on time range
    const now = new Date();
    let startDate = new Date();
    
    switch(timeRange) {
        case '7d': startDate.setDate(now.getDate() - 7); break;
        case '30d': startDate.setDate(now.getDate() - 30); break;
        case '90d': startDate.setDate(now.getDate() - 90); break;
        default: startDate.setDate(now.getDate() - 30); // Default to 30 days
    }
    
    const filteredData = buildData.filter(build => 
        new Date(build.timestamp) >= startDate);
    
    console.log("Filtered to", filteredData.length, "records for time range", timeRange);
    
    // Group by repository
    const repoData = {};
    
    filteredData.forEach(build => {
        const repoName = build.repo_name || "unknown";
        
        if (!repoData[repoName]) {
            repoData[repoName] = [];
        }
        
        repoData[repoName].push(build);
    });
    
    // Count builds by status for each repository
    const repos = Object.keys(repoData);
    const successCounts = repos.map(repo => 
        repoData[repo].filter(build => build.status === 'success').length);
    const failureCounts = repos.map(repo => 
        repoData[repo].filter(build => build.status === 'failure').length);
    const otherCounts = repos.map(repo => 
        repoData[repo].filter(build => 
            build.status !== 'success' && build.status !== 'failure').length);
    
    // Create chart
    const ctx = document.getElementById('buildStatusChart').getContext('2d');
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: repos,
            datasets: [
                {
                    label: 'Success',
                    data: successCounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Failure',
                    data: failureCounts,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Other',
                    data: otherCounts,
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Repository'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Builds'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `Build Results by Repository (${timeRange})`
                },
                tooltip: {
                    callbacks: {
                        afterTitle: function(tooltipItems) {
                            const repoName = tooltipItems[0].label;
                            const totalBuilds = repoData[repoName].length;
                            return `Total Builds: ${totalBuilds}`;
                        }
                    }
                }
            }
        }
    });
}

// Function to update the build status chart
function updateBuildStatusChart(timeRange) {
    console.log("Updating build status chart for time range:", timeRange);
    
    // Update debug message
    const debugDiv = document.getElementById('build-history-debug');
    if (debugDiv) {
        debugDiv.textContent = "Loading build history data...";
    }
    
    // Fetch the data
    fetch('data/history/build_history_combined.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load data: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(`Loaded ${data.length} build history records`);
            
            // Update debug info
            if (debugDiv) {
                debugDiv.textContent = `Loaded ${data.length} build history records`;
            }
            
            // Create/update chart
            if (window.buildStatusChart) {
                window.buildStatusChart.destroy();
            }
            
            window.buildStatusChart = createBuildStatusChart(data, timeRange);
        })
        .catch(error => {
            console.error("Error loading build history:", error);
            if (debugDiv) {
                debugDiv.textContent = `Error: ${error.message}`;
            }
        });
}

// Modify the existing time range event listener
document.getElementById('time-range').addEventListener('change', function() {
    const timeRange = this.value;
    
    // Update all charts with the new time range
    updateCharts(timeRange);
});

// Function to update all charts
function updateCharts(timeRange) {
    // Update existing charts
    updatePassRateChart(timeRange);
    updateTestDurationChart(timeRange);
    updateTestCountChart(timeRange);
    
    // Update the build status chart
    updateBuildStatusChart(timeRange);
}

// Add this near the top of the file, before any chart creation
function debugBuildHistory() {
    console.log("Debugging build history visualization");
    
    // Check if the data file exists
    fetch('data/history/build_history_combined.json')
        .then(response => {
            if (!response.ok) {
                console.error("Failed to load build history data:", response.status, response.statusText);
                document.getElementById('build-history-debug').innerHTML = 
                    'Error: Could not load build history data. Status: ' + response.status;
                return null;
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                console.log("Build history data loaded successfully:", data.length, "records");
                document.getElementById('build-history-debug').innerHTML = 
                    'Data loaded: ' + data.length + ' build records found';
                
                // Inspect the first record
                if (data.length > 0) {
                    console.log("Sample record:", data[0]);
                }
            }
        })
        .catch(error => {
            console.error("Error loading build history:", error);
            document.getElementById('build-history-debug').innerHTML = 
                'Error: ' + error.message;
        });
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', debugBuildHistory); 