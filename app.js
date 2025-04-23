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
        try {
            // Parse the date (parse as UTC first)
            const timestamp = OVERALL_STATS.lastUpdated;
            
            // Create a date object directly from timestamp
            const updatedDate = new Date(timestamp);
            
            // Force conversion to London time using explicit offset calculation
            // Get London's offset in minutes
            const londonDate = new Date(updatedDate.toLocaleString('en-GB', {timeZone: 'Europe/London'}));
            
            // Format just the time portion in 24h format
            const londonHours = londonDate.getHours().toString().padStart(2, '0');
            const londonMinutes = londonDate.getMinutes().toString().padStart(2, '0');
            const londonTime = `${londonHours}:${londonMinutes}`;
            
            // Format the date portions for comparison
            const now = new Date();
            const todayDate = new Date(now.toLocaleString('en-GB', {timeZone: 'Europe/London'}));
            
            // Compare just the dates (ignore time)
            const isSameDay = 
                todayDate.getDate() === londonDate.getDate() && 
                todayDate.getMonth() === londonDate.getMonth() && 
                todayDate.getFullYear() === londonDate.getFullYear();
            
            lastUpdatedValue.innerHTML = '';
            
            if (isSameDay) {
                // Today
                const todaySpan = document.createElement('div');
                todaySpan.textContent = 'Today';
                todaySpan.style.fontWeight = 'bold';
                lastUpdatedValue.appendChild(todaySpan);
                
                const timeSpan = document.createElement('div');
                timeSpan.textContent = londonTime;
                timeSpan.style.fontSize = '28px';
                timeSpan.style.fontWeight = 'bold'; // Make time bold to match "Today"
                lastUpdatedValue.appendChild(timeSpan);
            } else {
                // Other date
                const dateOptions = {
                    timeZone: 'Europe/London',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                };
                const formattedDate = londonDate.toLocaleDateString('en-GB', dateOptions);
                
                const dateSpan = document.createElement('div');
                dateSpan.textContent = formattedDate;
                dateSpan.style.fontWeight = 'bold';
                lastUpdatedValue.appendChild(dateSpan);
                
                const timeSpan = document.createElement('div');
                timeSpan.textContent = londonTime;
                timeSpan.style.fontSize = '28px';
                timeSpan.style.fontWeight = 'bold'; // Make time bold to match date
                lastUpdatedValue.appendChild(timeSpan);
            }
        } catch (e) {
            console.error("Error formatting date:", e);
            lastUpdatedValue.textContent = OVERALL_STATS.lastUpdated || "Unknown";
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
