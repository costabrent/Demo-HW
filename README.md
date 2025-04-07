# TypeScript BTC Price Tracker

This project fetches and displays Bitcoin price data from the Binance API. It's built with TypeScript and automatically deployed to GitHub Pages using GitHub Actions.

## Project Structure

- `src/` - TypeScript source code
- `public/` - Static HTML, CSS, and other assets
- `dist/` - Compiled JavaScript (generated during build)
- `.github/workflows/` - GitHub Actions workflow configuration

## GitHub Workflow

This project uses GitHub Actions to automatically build and deploy the application to GitHub Pages whenever changes are pushed to the main branch.

The workflow does the following:

1. Checks out the code
2. Sets up Node.js
3. Installs dependencies
4. Builds the TypeScript code
5. Copies the public files to the dist directory
6. Deploys the dist directory to GitHub Pages

## Development

To set up the project locally:

```bash
# Install dependencies
npm install

# Build the TypeScript code
npm run build

# Run in development mode with watch
npm run dev
```

## Deployment

The project is automatically deployed to GitHub Pages when changes are pushed to the main branch. You can also manually trigger the workflow from the GitHub Actions tab.

To view the deployed site, go to: https://[your-username].github.io/[repository-name]/

## Technologies Used

- TypeScript
- Webpack for bundling
- Axios for API requests
- pandas-js for data manipulation
- GitHub Actions for CI/CD
- GitHub Pages for hosting
