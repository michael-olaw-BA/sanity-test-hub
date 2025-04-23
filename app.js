// Dynamic repository rendering script
document.addEventListener('DOMContentLoaded', function() {
    // Update dashboard stats
    document.querySelector('.stat-card:nth-child(1) .stat-value').textContent = OVERALL_STATS.repositories;
    document.querySelector('.stat-card:nth-child(2) .stat-value').textContent = OVERALL_STATS.passRate + '%';
    document.querySelector('.stat-card:nth-child(3) .stat-value').textContent = OVERALL_STATS.critical;
    
    // Set the last update time from pipeline execution data
    // Assuming OVERALL_STATS.lastUpdated contains the pipeline timestamp
    const lastUpdate = OVERALL_STATS.lastUpdated || new Date();
    const day = lastUpdate.getDate ? lastUpdate.getDate() : new Date(lastUpdate).getDate();
    const month = lastUpdate.toLocaleString ? lastUpdate.toLocaleString('default', { month: 'short' }) : new Date(lastUpdate).toLocaleString('default', { month: 'short' });
    const year = lastUpdate.getFullYear ? lastUpdate.getFullYear() : new Date(lastUpdate).getFullYear();
    const hours = (lastUpdate.getHours ? lastUpdate.getHours() : new Date(lastUpdate).getHours()).toString().padStart(2, '0');
    const minutes = (lastUpdate.getMinutes ? lastUpdate.getMinutes() : new Date(lastUpdate).getMinutes()).toString().padStart(2, '0');
    document.querySelector('.stat-card:nth-child(4) .stat-value').textContent = `${day} ${month} ${year}\n@ ${hours}:${minutes}`;

    // Clear existing repositories
    const gridView = document.getElementById('gridView');
    const listView = document.getElementById('listView');
    gridView.innerHTML = '';
    listView.innerHTML = '';
    
    // Render repositories from config
    REPOSITORIES.forEach(repo => {
        // Create grid view card
        const gridCard = createGridCard(repo);
        gridView.appendChild(gridCard);
        
        // Create list view item
        const listItem = createListItem(repo);
        listView.appendChild(listItem);
    });
});

// Add from=hub parameter to URLs
function addHubParameter(url) {
    // Check if URL already has parameters
    if (url.includes('?')) {
        return `${url}&from=hub`;
    } else {
        return `${url}?from=hub`;
    }
}

// Create a repository card for grid view
function createGridCard(repo) {
    const card = document.createElement('div');
    card.className = 'repository-card';
    
    // Add from=hub parameter to URL
    const reportUrl = addHubParameter(repo.url);
    
    card.innerHTML = `
        <div class="repository-header">
            <div class="repository-name">${repo.name}</div>
            <div class="repository-description">${repo.description}</div>
        </div>
        <div class="repository-stats">
            <div class="repo-stat">
                <div class="repo-stat-value">${repo.stats.total}</div>
                <div class="repo-stat-label">Total Tests</div>
            </div>
            <div class="repo-stat">
                <div class="repo-stat-value">${repo.stats.passed}</div>
                <div class="repo-stat-label">Passed</div>
            </div>
            <div class="repo-stat">
                <div class="repo-stat-value">${repo.stats.failed}</div>
                <div class="repo-stat-label">Failed</div>
            </div>
        </div>
        <div class="repository-footer">
            <div class="last-update">
                <span class="status-indicator status-${repo.status}"></span>
                Updated ${repo.lastUpdate}
            </div>
            <a href="${reportUrl}" class="view-report">View Report</a>
        </div>
    `;
    
    return card;
}

// Create a repository item for list view
function createListItem(repo) {
    const item = document.createElement('div');
    item.className = 'repository-list-item';
    
    // Add from=hub parameter to URL
    const reportUrl = addHubParameter(repo.url);
    
    item.innerHTML = `
        <div class="repository-info">
            <div class="repository-icon">
                <i class="fas fa-code-branch"></i>
            </div>
            <div class="repository-details">
                <h3>${repo.name}</h3>
                <p>${repo.description}</p>
            </div>
        </div>
        <div class="repository-metrics">
            <div class="repository-metric">
                <div class="repository-metric-value">${repo.stats.total}</div>
                <div class="repository-metric-label">Total</div>
            </div>
            <div class="repository-metric">
                <div class="repository-metric-value">${repo.stats.passed}</div>
                <div class="repository-metric-label">Passed</div>
            </div>
            <div class="repository-metric">
                <div class="repository-metric-value">${repo.stats.failed}</div>
                <div class="repository-metric-label">Failed</div>
            </div>
        </div>
        <div class="repository-actions">
            <div class="last-update">
                <span class="status-indicator status-${repo.status}"></span>
                ${repo.lastUpdate}
            </div>
            <a href="${reportUrl}" class="view-report">View Report</a>
        </div>
    `;
    
    return item;
}
