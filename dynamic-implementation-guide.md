# Dynamic Dashboard Implementation Guide

This guide provides instructions for implementing the Sanity Test Reports Hub with dynamic data fetching, a central dashboard for accessing test reports from multiple repositories.

## Overview

The Sanity Test Reports Hub is a modern, responsive dashboard that:
- Displays links to test reports from multiple repositories
- Shows key metrics for each repository (total tests, passed, failed)
- **Dynamically updates statistics** using GitHub Actions
- Provides both grid and list views
- Includes search functionality
- Is easily configurable and extensible

## Files Structure

The dashboard consists of four main files:
1. `index.html` - The main HTML file with the dashboard structure and styling
2. `config.js` - Configuration file containing repository data (automatically updated)
3. `app.js` - JavaScript file for dynamic rendering and interactivity
4. `.github/workflows/update-stats.yml` - GitHub Actions workflow for automatic updates

## Implementation Steps

### 1. Create a New GitHub Repository

1. Go to https://github.com/new
2. Name the repository "sanity-test-hub"
3. Set it as Public
4. Click "Create repository"

### 2. Set Up the Files

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/mik3ola/sanity-test-hub.git
   cd sanity-test-hub
   ```

2. Create the directory structure:
   ```bash
   mkdir -p .github/workflows
   ```

3. Create the following files:
   - `index.html`
   - `config.js`
   - `app.js`
   - `.github/workflows/update-stats.yml`

4. Copy the provided code into each file.

5. For the initial setup, update the `config.js` file with your repositories:
   - Modify the `repositories` array in the Python script within `update-stats.yml`
   - You can leave the statistics as they are; they will be updated automatically

### 3. Test Locally

1. Open the `index.html` file in a web browser to verify it works correctly
2. Test the search functionality
3. Test switching between grid and list views
4. Verify that repository links work correctly

### 4. Deploy to GitHub Pages

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Initial commit with Sanity Test Reports Hub"
   git push origin main
   ```

2. Enable GitHub Pages:
   - Go to your repository settings
   - Scroll down to "GitHub Pages"
   - Under "Source", select "Deploy from a branch"
   - Select "main" branch and "/ (root)" folder
   - Click "Save"

3. Access your dashboard at:
   `https://mik3ola.github.io/sanity-test-hub/`

### 5. Set Up Automatic Updates

1. The GitHub Actions workflow is already included in `.github/workflows/update-stats.yml`
2. It will run automatically every day at midnight
3. You can also trigger it manually from the "Actions" tab in your repository

## How the Dynamic Updates Work

The automatic update system works as follows:

1. **GitHub Actions Workflow**:
   - Runs on a schedule (daily at midnight)
   - Can also be triggered manually

2. **Python Script**:
   - Fetches repository information from GitHub API
   - Retrieves metrics from each repository's GitHub Pages
   - Calculates time since last update
   - Determines status based on workflow run conclusions

3. **Data Sources**:
   - Repository information: GitHub API
   - Test metrics: `metrics.json` from each repository's GitHub Pages
   - Last update time: Latest workflow run from GitHub API
   - Status: Derived from workflow run conclusion

4. **Fallback Mechanism**:
   - If any data source is unavailable, uses intelligent defaults
   - Ensures the dashboard always displays something meaningful

## Customization Options

### Adding New Repositories

To add a new repository to the dashboard:

1. Open `.github/workflows/update-stats.yml`
2. Find the `repositories` array in the Python script
3. Add a new entry:
   ```python
   {"owner": "mik3ola", "repo": "new-repo-name"},
   ```
4. Commit and push the change
5. Manually trigger the workflow to update immediately

### Modifying the Layout

The dashboard uses CSS variables for easy styling. To change the color scheme:

1. Open `index.html`
2. Locate the `:root` CSS selector
3. Modify the color variables:
   ```css
   :root {
       --primary-color: #your-color-here;
       --secondary-color: #your-color-here;
       /* other variables */
   }
   ```

### Changing Update Frequency

To change how often the statistics are updated:

1. Open `.github/workflows/update-stats.yml`
2. Modify the `cron` expression in the `schedule` section:
   ```yaml
   schedule:
     - cron: '0 0 * * *'  # Current: daily at midnight
   ```
   
   Some examples:
   - `0 */6 * * *` - Every 6 hours
   - `0 0 * * 1-5` - Weekdays at midnight
   - `0 12 * * *` - Daily at noon UTC

## Integration with Existing Sanity Tests

To ensure your repositories work well with this dynamic dashboard:

1. Make sure each repository has its own dashboard deployed to GitHub Pages
2. Include a `metrics.json` file in the GitHub Pages root with this structure:
   ```json
   {
     "total_tests": 10,
     "passed_tests": 8,
     "failed_tests": 2,
     "critical_tests_count": 3
   }
   ```
3. Ensure your GitHub Actions workflows have descriptive conclusions (success/failure)

## Embedding in Confluence

To embed the central dashboard in Confluence:

1. Go to your Confluence page
2. Edit the page
3. Click the "+" button to add content
4. Select "HTML" or "iframe" macro
5. Add the following HTML:
   ```html
   <iframe src="https://mik3ola.github.io/sanity-test-hub/" 
           width="100%" 
           height="800px" 
           frameborder="0" 
           allowfullscreen>
   </iframe>
   ```
6. Save the page

## Advanced Customization

### Adding Authentication

For private repositories, you'll need to use a GitHub token:

1. Create a Personal Access Token with `repo` scope
2. Add it as a repository secret named `GH_TOKEN`
3. Update the workflow to use the token:
   ```yaml
   - name: Update repository statistics
     env:
       GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
     run: |
       # Script content
   ```

### Custom Metrics

To add custom metrics beyond the default ones:

1. Modify the Python script in `update-stats.yml` to fetch additional metrics
2. Update the `config.js` structure to include the new metrics
3. Modify `app.js` and `index.html` to display the new metrics

## Troubleshooting

### Workflow Not Running

If the automatic updates aren't working:

1. Check the "Actions" tab in your repository
2. Verify that workflows are enabled for the repository
3. Check for any error messages in the workflow runs
4. Try running the workflow manually

### Missing or Incorrect Data

If repository data is missing or incorrect:

1. Check that the repository exists and is accessible
2. Verify that GitHub Pages is enabled for the repository
3. Ensure the `metrics.json` file is available at the repository's GitHub Pages URL
4. Check the workflow logs for any API rate limiting issues

### Dashboard Not Updating

If the dashboard isn't reflecting the latest data:

1. Check when the last workflow run completed successfully
2. Verify that the `config.js` file was updated in the repository
3. Clear your browser cache to ensure you're seeing the latest version

## Conclusion

This dynamic central dashboard provides a convenient way to access and monitor sanity test reports across multiple repositories. By leveraging GitHub Actions for automatic updates, you ensure that the dashboard always displays the most current information without manual intervention.

For any questions or issues, please contact michael.olaw@outlook.com or open an issue in the GitHub repository.
