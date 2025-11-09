# 🐙 GitHub Setup Guide for HYADES Formations

## Step-by-Step Instructions

### Step 1: Configure Git Locally

Open your terminal and run these commands:

```bash
# Set your name
git config --global user.name "Antoine Barthes"

# Set your email (use the email associated with your GitHub account)
git config --global user.email "your-email@example.com"

# Verify configuration
git config --global --list
```

**Replace `your-email@example.com` with your actual GitHub email!**

---

### Step 2: Initialize Git Repository

Navigate to your project and initialize git:

```bash
cd /Users/antoinebarthes/Desktop/HYADES/hyades-formations

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - HYADES Formations ready for deployment"
```

---

### Step 3: Create GitHub Repository

1. Go to **[https://github.com/new](https://github.com/new)**
2. Fill in the details:
   - **Repository name**: `hyades-formations`
   - **Description**: `HYADES Formations - Training program catalog and management`
   - **Visibility**: Choose **Public** or **Private**
   - **DO NOT** check "Initialize with README" (we already have files)
   - **DO NOT** add .gitignore or license (we already have them)
3. Click **"Create repository"**

---

### Step 4: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Run these:

```bash
# Add GitHub as remote
git remote add origin https://github.com/YOUR-USERNAME/hyades-formations.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

**Replace `YOUR-USERNAME` with your actual GitHub username!**

---

### Step 5: Authentication

When you run `git push`, you'll need to authenticate:

#### Option A: Personal Access Token (Recommended)

1. Go to **GitHub Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
   - Direct link: [https://github.com/settings/tokens](https://github.com/settings/tokens)

2. Click **"Generate new token"** → **"Generate new token (classic)"**

3. Configure:
   - **Note**: `HYADES Formations`
   - **Expiration**: 90 days (or No expiration)
   - **Scopes**: Check `repo` (full control of private repositories)

4. Click **"Generate token"**

5. **COPY THE TOKEN** (you won't see it again!)

6. When prompted for password during `git push`, paste the token instead

#### Option B: GitHub CLI (Easier)

```bash
# Install GitHub CLI (if not installed)
brew install gh

# Authenticate
gh auth login

# Follow the prompts:
# - Choose: GitHub.com
# - Choose: HTTPS
# - Authenticate with: Login with a web browser
# - Follow the browser prompts
```

---

### Step 6: Verify Push

After pushing, verify:

```bash
# Check remote
git remote -v

# Should show:
# origin  https://github.com/YOUR-USERNAME/hyades-formations.git (fetch)
# origin  https://github.com/YOUR-USERNAME/hyades-formations.git (push)
```

Go to `https://github.com/YOUR-USERNAME/hyades-formations` in your browser - you should see your code!

---

## 🔄 Future Updates

After initial setup, to push changes:

```bash
# Stage changes
git add .

# Commit with message
git commit -m "Description of changes"

# Push to GitHub
git push
```

---

## 🚨 Common Issues

### Issue: "Authentication failed"

**Solution**: Use Personal Access Token instead of password
- Generate token at: https://github.com/settings/tokens
- Use token as password when prompted

### Issue: "Repository not found"

**Solution**: Check your GitHub username in the remote URL
```bash
# Check current remote
git remote -v

# Update if needed
git remote set-url origin https://github.com/CORRECT-USERNAME/hyades-formations.git
```

### Issue: "Permission denied (publickey)"

**Solution**: You're using SSH instead of HTTPS
```bash
# Switch to HTTPS
git remote set-url origin https://github.com/YOUR-USERNAME/hyades-formations.git
```

### Issue: "Failed to push some refs"

**Solution**: Pull first if repository has changes
```bash
git pull origin main --rebase
git push
```

---

## ✅ Quick Commands Cheat Sheet

```bash
# Check status
git status

# See what changed
git diff

# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard all local changes
git reset --hard HEAD

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main
```

---

## 🎯 Next Steps After GitHub Setup

Once your code is on GitHub:

1. **Deploy Frontend to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Import from GitHub
   - Select `hyades-formations` repository

2. **Deploy Backend to Render**
   - Go to [render.com](https://render.com)
   - Create Web Service
   - Point to `server` folder

See `QUICK-DEPLOY.md` for detailed deployment steps.

---

## 💡 Tips

- **Commit often**: Small, focused commits are better
- **Write clear messages**: Describe what and why
- **Pull before push**: Avoid conflicts
- **Use branches**: For experimental features
- **Check .gitignore**: Ensure secrets aren't committed

---

## 🆘 Need Help?

If you encounter issues:
1. Check error message carefully
2. Google the exact error message
3. Check GitHub docs: https://docs.github.com
4. Ask on Stack Overflow with the `git` tag
