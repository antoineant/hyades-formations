# 🚀 Quick Deployment Guide - HYADES Formations

## TL;DR - 3 Steps to Deploy

### Step 1: Push to GitHub (5 minutes)

```bash
cd /Users/antoinebarthes/Desktop/HYADES/hyades-formations

# Initialize and push
git init
git add .
git commit -m "Initial commit - HYADES Formations ready for deployment"

# Create repo on GitHub.com, then:
git remote add origin https://github.com/YOUR_USERNAME/hyades-formations.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Frontend to Netlify (5 minutes)

1. Go to **[netlify.com](https://netlify.com)** → Sign in with GitHub
2. Click **"Add new site"** → **"Import from Git"**
3. Select **your repository**
4. Settings auto-detected ✓ (build command: `npm run build`, publish: `dist`)
5. Click **"Deploy"**
6. Get your URL: `https://YOUR-SITE.netlify.app`

### Step 3: Deploy Backend to Render (10 minutes)

1. Go to **[render.com](https://render.com)** → Sign in with GitHub
2. Click **"New +"** → **"Web Service"**
3. Select **your repository**
4. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Click **"Create Web Service"** (Free plan)
6. Get your URL: `https://YOUR-BACKEND.onrender.com`

### Step 4: Connect Frontend to Backend (2 minutes)

Edit `src/config/api.js` line 9:

```javascript
production: {
  baseURL: 'https://YOUR-BACKEND.onrender.com/api'  // Your Render URL
}
```

Edit `server/server.js` line 16:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5174',
    'https://YOUR-SITE.netlify.app'  // Your Netlify URL
  ]
}))
```

Commit and push:

```bash
git add .
git commit -m "Configure production URLs"
git push
```

**Done!** Netlify and Render will auto-redeploy. ✅

---

## 📋 What You Get

- **Public Website**: Browse training catalog
- **PDF Generation**: Download formatted PDFs
- **Workshop Converter**: Convert ai4trainers workshops
- **Auto-deployment**: Push to GitHub → auto-deploy

---

## 🎯 URLs to Remember

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend (Netlify) | `https://YOUR-SITE.netlify.app` | Public website |
| Backend (Render) | `https://YOUR-BACKEND.onrender.com` | API server |
| GitHub | `https://github.com/YOUR_USERNAME/hyades-formations` | Source code |

---

## ⚠️ Important Notes

1. **Render Free Tier**: Backend sleeps after 15 min inactivity. First request takes ~30 seconds to wake up.

2. **Environment**:
   - Development: `npm run dev` (uses localhost:3003)
   - Production: Netlify build (uses your Render URL)

3. **Updates**: Just push to GitHub → both services redeploy automatically

---

## 🛠 Alternative: Use the Interactive Script

```bash
chmod +x deploy-guide.sh
./deploy-guide.sh
```

This script walks you through each step interactively.

---

## 📚 Need More Details?

See `DEPLOYMENT.md` for comprehensive documentation including:
- Alternative hosting options
- Custom domain setup
- Troubleshooting
- Environment variables
- Database migration

---

## ✅ Verify Deployment

After deployment, test:

1. **Home page loads**: `https://YOUR-SITE.netlify.app`
2. **Formation details work**: Click on any training
3. **PDF download works**: Try downloading a PDF
4. **Converter works**: Upload a workshop.json file

If any feature fails, check:
- Browser console for errors
- Render logs for backend errors
- CORS configuration
- API URL configuration

---

## 🆘 Quick Troubleshooting

**Frontend builds but shows blank page**
- Check browser console for errors
- Verify build succeeded on Netlify
- Check `netlify.toml` redirect rules

**Backend not responding**
- Check Render logs
- Verify service is running (not sleeping)
- Test API directly: `https://YOUR-BACKEND.onrender.com/api/health`

**CORS errors in browser**
- Update `server/server.js` CORS origin
- Include your Netlify URL
- Redeploy backend

**PDF generation fails**
- Check Render logs for errors
- Verify pdfkit installed
- Check file read permissions

---

## 💰 Cost

- **Netlify**: Free (100GB bandwidth, unlimited sites)
- **Render**: Free (750 hours/month, sleeps after inactivity)
- **Total**: **$0/month** for personal/small business use

To upgrade:
- Netlify Pro: $19/month (no sleep, better bandwidth)
- Render Starter: $7/month (no sleep, better performance)
