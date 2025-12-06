#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Navigate to website source
cd website

# Install dependencies if missing
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm ci
fi

# Build the project (outputs to repo root)
echo "🛠️  Building website..."
npm run build

# Go back to repo root
cd ..

# Add build artifacts and source changes
echo "📝 Staging changes..."
git add index.html assets/ website/ vite.svg

# Commit changes
# The '|| true' allows the script to continue if there's nothing new to commit
echo "💾 Committing..."
git commit -m "deploy: update website build [skip ci]" || true

# Push to main
echo "⬆️  Pushing to GitHub..."
git push origin main

echo "✅ Deployment complete! Changes pushed to 'main'."
