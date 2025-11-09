#!/bin/bash

# HYADES Formations - Interactive Deployment Guide
# This script will guide you through deploying your application

echo "🚀 HYADES Formations - Deployment Setup"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if git is initialized
if [ ! -d .git ]; then
  echo -e "${YELLOW}Git repository not initialized.${NC}"
  echo -e "${BLUE}Initializing git repository...${NC}"
  git init
  echo -e "${GREEN}✓ Git initialized${NC}"
  echo ""
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
  echo -e "${YELLOW}You have uncommitted changes.${NC}"
  echo ""
  read -p "Do you want to commit all changes? (y/n) " -n 1 -r
  echo ""
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git add .
    read -p "Enter commit message: " commit_msg
    git commit -m "$commit_msg"
    echo -e "${GREEN}✓ Changes committed${NC}"
  fi
  echo ""
fi

# Check if remote is set
if ! git remote | grep -q 'origin'; then
  echo -e "${YELLOW}No git remote configured.${NC}"
  echo ""
  echo "Please follow these steps:"
  echo "1. Go to https://github.com/new"
  echo "2. Create a new repository named 'hyades-formations'"
  echo "3. Do NOT initialize with README, .gitignore, or license"
  echo ""
  read -p "Press Enter once you've created the repository..."
  echo ""
  read -p "Enter your GitHub repository URL (e.g., https://github.com/username/hyades-formations.git): " repo_url
  git remote add origin "$repo_url"
  echo -e "${GREEN}✓ Remote added${NC}"
  echo ""
fi

# Push to GitHub
echo -e "${BLUE}Pushing to GitHub...${NC}"
git branch -M main
if git push -u origin main; then
  echo -e "${GREEN}✓ Code pushed to GitHub${NC}"
else
  echo -e "${YELLOW}⚠ Push failed. You may need to authenticate with GitHub.${NC}"
  echo "Try running: git push -u origin main"
fi
echo ""

# Netlify deployment instructions
echo "=========================================="
echo "📦 FRONTEND DEPLOYMENT (Netlify)"
echo "=========================================="
echo ""
echo "Next steps to deploy your frontend:"
echo ""
echo "1. Go to: ${BLUE}https://app.netlify.com${NC}"
echo "2. Click 'Add new site' → 'Import an existing project'"
echo "3. Choose 'Deploy with GitHub'"
echo "4. Select your 'hyades-formations' repository"
echo "5. Netlify will auto-detect the settings:"
echo "   - Build command: npm run build"
echo "   - Publish directory: dist"
echo "6. Click 'Deploy site'"
echo ""
read -p "Press Enter once your site is deployed on Netlify..."
echo ""
read -p "Enter your Netlify site URL (e.g., https://your-site.netlify.app): " netlify_url
echo -e "${GREEN}✓ Netlify URL saved: $netlify_url${NC}"
echo ""

# Backend deployment instructions
echo "=========================================="
echo "⚙️  BACKEND DEPLOYMENT (Render)"
echo "=========================================="
echo ""
echo "Next steps to deploy your backend:"
echo ""
echo "1. Go to: ${BLUE}https://render.com${NC}"
echo "2. Sign up/login with GitHub"
echo "3. Click 'New +' → 'Web Service'"
echo "4. Select your 'hyades-formations' repository"
echo "5. Configure:"
echo "   - Name: hyades-formations-backend"
echo "   - Root Directory: server"
echo "   - Environment: Node"
echo "   - Build Command: npm install"
echo "   - Start Command: npm start"
echo "   - Plan: Free"
echo "6. Click 'Create Web Service'"
echo ""
read -p "Press Enter once your backend is deployed on Render..."
echo ""
read -p "Enter your Render backend URL (e.g., https://hyades-formations-backend.onrender.com): " backend_url
echo -e "${GREEN}✓ Backend URL saved: $backend_url${NC}"
echo ""

# Update configuration
echo "=========================================="
echo "🔧 UPDATING CONFIGURATION"
echo "=========================================="
echo ""

# Update API config
echo -e "${BLUE}Updating API configuration...${NC}"
cat > src/config/api.js << EOF
// API configuration for different environments

const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:3003/api'
  },
  production: {
    baseURL: '${backend_url}/api'
  }
}

// Detect environment
const ENV = import.meta.env.MODE || 'development'

// Export the appropriate config
export const API_BASE_URL = API_CONFIG[ENV].baseURL

// Helper function to build full API URLs
export const getApiUrl = (endpoint) => {
  return \`\${API_BASE_URL}\${endpoint}\`
}
EOF
echo -e "${GREEN}✓ API config updated${NC}"

# Update server CORS
echo -e "${BLUE}Updating CORS configuration...${NC}"
echo ""
echo "Manual step required:"
echo "Edit server/server.js and update the CORS configuration:"
echo ""
echo -e "${YELLOW}Replace:${NC}"
echo "  app.use(cors())"
echo ""
echo -e "${YELLOW}With:${NC}"
echo "  app.use(cors({"
echo "    origin: ["
echo "      'http://localhost:5174',"
echo "      '${netlify_url}'"
echo "    ]"
echo "  }))"
echo ""
read -p "Press Enter once you've updated the CORS configuration..."
echo ""

# Commit and push
echo -e "${BLUE}Committing configuration changes...${NC}"
git add .
git commit -m "Configure production URLs for Netlify and Render"
git push
echo -e "${GREEN}✓ Changes pushed to GitHub${NC}"
echo ""

echo "=========================================="
echo "✅ DEPLOYMENT COMPLETE!"
echo "=========================================="
echo ""
echo "Your application should now be deployed:"
echo "- Frontend: ${GREEN}$netlify_url${NC}"
echo "- Backend: ${GREEN}$backend_url${NC}"
echo ""
echo "Next steps:"
echo "1. Wait for Netlify to rebuild (automatic)"
echo "2. Test your live site"
echo "3. Check that all features work (PDF download, converter)"
echo ""
echo "For detailed documentation, see DEPLOYMENT.md"
echo ""
