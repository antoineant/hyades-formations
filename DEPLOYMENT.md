# 🚀 HYADES Formations - Deployment Guide

This guide will help you deploy your HYADES Formations website to make it publicly accessible.

## 📦 Architecture Overview

Your project has two components:
- **Frontend (Vue.js)** → Deploy to Netlify
- **Backend (Express server)** → Deploy to Render/Railway/Heroku

---

## Part 1: Deploy Frontend to Netlify

### Step 1: Prepare Git Repository

If not already done, initialize git and push to GitHub:

```bash
cd /Users/antoinebarthes/Desktop/HYADES/hyades-formations

# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit - HYADES Formations"

# Create GitHub repo and push
# Go to github.com and create a new repository
# Then run:
git remote add origin https://github.com/YOUR_USERNAME/hyades-formations.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Netlify

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Sign up or log in (you can use GitHub login)
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose **"Deploy with GitHub"**
5. Authorize Netlify to access your GitHub
6. Select your `hyades-formations` repository

### Step 3: Configure Build Settings

Netlify should auto-detect your settings, but verify:

- **Branch to deploy**: `main`
- **Build command**: `npm run build`
- **Publish directory**: `dist`

Click **"Deploy site"**

### Step 4: Get Your Site URL

Once deployed, Netlify will give you a URL like:
`https://random-name-123456.netlify.app`

You can customize this:
- Go to **Site settings** → **Domain management**
- Click **"Edit site name"**
- Change to: `hyades-formations` (if available)

---

## Part 2: Deploy Backend to Render (Free Option)

### Step 1: Prepare Backend for Production

Create a separate package.json for the server:

```bash
cd server
npm init -y
```

Update `server/package.json`:

```json
{
  "name": "hyades-formations-backend",
  "version": "1.0.0",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "pdfkit": "^0.13.0"
  }
}
```

Install dependencies:

```bash
cd server
npm install
```

### Step 2: Create Render Account and Deploy

1. Go to [https://render.com](https://render.com)
2. Sign up with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Configure:
   - **Name**: `hyades-formations-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

6. Add Environment Variables (if needed):
   - Click **"Advanced"**
   - Add any environment variables

7. Click **"Create Web Service"**

8. Once deployed, you'll get a URL like:
   `https://hyades-formations-backend.onrender.com`

### Step 3: Update Frontend to Use Production Backend

In your frontend code, update the API configuration:

Edit `src/config/api.js`:

```javascript
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:3003/api'
  },
  production: {
    baseURL: 'https://hyades-formations-backend.onrender.com/api' // Your Render URL
  }
}
```

Commit and push this change:

```bash
git add src/config/api.js
git commit -m "Update production API URL"
git push
```

Netlify will automatically redeploy!

---

## Part 3: Update Backend CORS Settings

Edit `server/server.js` to allow requests from your Netlify domain:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5174',
    'https://hyades-formations.netlify.app' // Your Netlify URL
  ]
}))
```

Push changes to trigger Render redeployment.

---

## 🎯 Quick Deployment Checklist

### Frontend (Netlify)
- [ ] Code pushed to GitHub
- [ ] Connected repository to Netlify
- [ ] Build settings configured
- [ ] Site deployed successfully
- [ ] Custom domain configured (optional)

### Backend (Render)
- [ ] Server code prepared with package.json
- [ ] Repository connected to Render
- [ ] Build and start commands configured
- [ ] Service deployed successfully
- [ ] API URL obtained

### Integration
- [ ] Frontend updated with production API URL
- [ ] Backend CORS configured for Netlify domain
- [ ] Test all features (PDF download, converter)

---

## 🔧 Alternative Backend Hosting Options

### Railway (Similar to Render)
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repo
3. Select `server` folder
4. Deploy automatically

### Heroku (Requires credit card, but has free tier)
1. Install Heroku CLI
2. `heroku create hyades-formations-backend`
3. `git subtree push --prefix server heroku main`

### Vercel Serverless Functions
- Convert Express routes to serverless functions
- More complex but can be free

---

## 🌐 Custom Domain (Optional)

### On Netlify:
1. Go to **Domain settings**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `formations.hyades.fr`)
4. Follow DNS configuration instructions

### On Render:
1. Go to your service settings
2. Add custom domain
3. Update DNS records

---

## 📊 Monitoring & Analytics

### Netlify Analytics
- Built-in analytics available (paid)
- Or add Google Analytics to your site

### Render Logs
- View logs in Render dashboard
- Monitor backend performance

---

## 🚨 Important Notes

1. **Free Tier Limitations**:
   - Render free tier sleeps after 15 minutes of inactivity
   - First request after sleep takes ~30 seconds
   - Consider upgrading for production use

2. **Environment Variables**:
   - Never commit sensitive data
   - Use Netlify/Render environment variables

3. **Backend Data Persistence**:
   - Currently, formations are stored in JSON file
   - Consider using a database (MongoDB, PostgreSQL) for production

---

## 🆘 Troubleshooting

### Build fails on Netlify
- Check Node version in `netlify.toml`
- Check build logs for errors
- Ensure all dependencies are in `package.json`

### Backend not responding
- Check Render logs
- Verify CORS settings
- Check API URL in frontend config

### PDF generation not working
- Ensure all dependencies installed on Render
- Check file system permissions
- Review Render logs for errors

---

## 📞 Need Help?

If you encounter issues:
1. Check deployment logs
2. Verify all configuration files
3. Test locally first
4. Check browser console for errors
