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