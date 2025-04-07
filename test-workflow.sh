#!/bin/bash

# This script tests the GitHub workflow locally

echo "Testing GitHub workflow locally..."

# Install dependencies
npm install

# Build the project
npm run build

# Copy public files to dist
mkdir -p dist
cp -r public/* dist/

echo "Build completed successfully!"
echo "To test the site locally, you can run: npx serve dist"
