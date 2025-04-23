// Dynamic repository rendering script
document.addEventListener('DOMContentLoaded', function() {
    // Update dashboard stats
    document.querySelector('.stat-card:nth-child(1) .stat-value').textContent = OVERALL_STATS.repositories;
    document.querySelector('.stat-card:nth-child(2) .stat-value').textContent = OVERALL_STATS.passRate + '%';
    document.querySelector('.stat-card:nth-child(3) .stat-value').textContent = OVERALL_STATS.critical;
    
    // Update the Last Updated card with a user-friendly format
    const lastUpdatedCard = document.querySelector('.stat-card:nth-child(4)');
    const lastUpdatedValue = lastUpdatedCard.querySelector('.stat-value');
    
    // Format the timestamp in user-friendly way
    if (OVERALL_STATS.lastUpdated) {
        // Parse the UTC date
        const updatedDate = new Date(OVERALL_STATS.lastUpdated + 'Z'); // Add Z to ensure UTC parsing
        
        // Convert to London time
        const options = { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hour12: false };
        const londonTime = updatedDate.toLocaleTimeString('en-GB', options);
        
        // Get current date in London
        const now = new Date();
        const londonNow = new Date(now.toLocaleString('en-GB', { timeZone: 'Europe/London' }));
        
        // Reset hours to compare just the dates
        const todayDate = new Date(londonNow);
        todayDate.setHours(0, 0, 0, 0);
        
        const yesterdayDate = new Date(todayDate);
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        
        const updatedDay = new Date(updatedDate);
        updatedDay.setHours(0, 0, 0, 0);
        
        // Calculate days difference
        const daysDiff = Math.floor((todayDate - updatedDay) / (1000 * 60 * 60 * 24));
        
        // Format based on how recent the update was
        lastUpdatedValue.innerHTML = '';
        
        if (daysDiff === 0) {
            // Today
            const todaySpan = document.createElement('div');
            todaySpan.textContent = 'Today';
            lastUpdatedValue.appendChild(todaySpan);
            
            const timeSpan = document.createElement('div');
            timeSpan.textContent = londonTime;
            timeSpan.style.fontSize = '28px';
            lastUpdatedValue.appendChild(timeSpan);
        } 
        else if (daysDiff === 1) {
            // Yesterday
            const yesterdaySpan = document.createElement('div');
            yesterdaySpan.textContent = 'Yesterday';
            lastUpdatedValue.appendChild(yesterdaySpan);
            
            const timeSpan = document.createElement('div');
            timeSpan.textContent = londonTime;
            timeSpan.style.fontSize = '28px';
            lastUpdatedValue.appendChild(timeSpan);
        }
        else if (daysDiff > 1) {
            // Within a week
            const daysSpan = document.createElement('div');
            daysSpan.textContent = `${daysDiff} Days ago`;
            lastUpdatedValue.appendChild(daysSpan);
            
            const timeSpan = document.createElement('div');
            timeSpan.textContent = londonTime;
            timeSpan.style.fontSize = '28px';
            lastUpdatedValue.appendChild(timeSpan);
        }
        else {
            // Older
            const options = { 
                timeZone: 'Europe/London',
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
            };
            const dateStr = updatedDate.toLocaleDateString('en-GB', options);
            lastUpdatedValue.textContent = dateStr;
            
            const timeSpan = document.createElement('div');
            timeSpan.textContent = londonTime;
            timeSpan.style.fontSize = '28px';
            lastUpdatedValue.appendChild(timeSpan);
        }
    } else {
        lastUpdatedValue.textContent = "Unknown";
    }
    
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
