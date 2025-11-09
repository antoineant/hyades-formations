# 🚀 Start Here - Push to GitHub in 5 Minutes

Follow these steps exactly in order. Copy and paste the commands.

---

## STEP 1: Configure Git Email (30 seconds)

Open your terminal and run this command with YOUR GitHub email:

```bash
git config --global user.email "your-github-email@example.com"
```

**⚠️ Replace `your-github-email@example.com` with your actual GitHub email address!**

To verify it worked:
```bash
git config --global --list
```

You should see:
```
user.name=Antoine Barthes
user.email=your-github-email@example.com
```

---

## STEP 2: Add and Commit Files (30 seconds)

Copy and paste these commands one by one:

```bash
cd /Users/antoinebarthes/Desktop/HYADES/hyades-formations

git add .

git commit -m "Initial commit - HYADES Formations"
```

You should see a message like "25 files changed, 5000+ insertions(+)"

---

## STEP 3: Create GitHub Repository (2 minutes)

1. **Open this link in your browser**: [https://github.com/new](https://github.com/new)

2. **Fill in**:
   - Repository name: `hyades-formations`
   - Description: `Training program catalog for HYADES`
   - Visibility: Choose **Public** or **Private** (your choice)

3. **IMPORTANT**:
   - ❌ DO NOT check "Add a README file"
   - ❌ DO NOT add .gitignore
   - ❌ DO NOT choose a license
   - Leave everything else unchecked!

4. **Click** the green **"Create repository"** button

5. **Keep this page open** - you'll need it for the next step

---

## STEP 4: Connect and Push (2 minutes)

After creating the repository, GitHub shows you some commands. **Ignore those** and use these instead:

### A. Add GitHub as Remote

Copy your GitHub username and run this (replace YOUR-USERNAME):

```bash
git remote add origin https://github.com/YOUR-USERNAME/hyades-formations.git
```

**Example**: If your username is `abarthes`, use:
```bash
git remote add origin https://github.com/abarthes/hyades-formations.git
```

### B. Push to GitHub

```bash
git branch -M main

git push -u origin main
```

---

## STEP 5: Authentication

When you run `git push`, you'll be asked for:
- **Username**: Your GitHub username
- **Password**: **DO NOT use your GitHub password!**

Instead, you need a **Personal Access Token**:

### Get Your Token (2 minutes):

1. Go to: [https://github.com/settings/tokens](https://github.com/settings/tokens)

2. Click **"Generate new token"** → **"Generate new token (classic)"**

3. Fill in:
   - Note: `HYADES Formations`
   - Expiration: `90 days` (or your choice)
   - Check the box: ✅ **repo** (Full control of private repositories)

4. Click **"Generate token"** at the bottom

5. **COPY THE TOKEN** (looks like: `ghp_xxxxxxxxxxxxxxxxxxxx`)

   ⚠️ **You won't see it again!** Save it somewhere safe.

6. **Paste this token** when asked for password in the terminal

---

## ✅ Verify Success

After pushing:

1. Go to: `https://github.com/YOUR-USERNAME/hyades-formations`

2. You should see all your files!

3. In terminal, verify with:
   ```bash
   git remote -v
   ```

---

## 🎉 You're Done!

Your code is now on GitHub.

**Next steps**:
- Deploy to Netlify: See `QUICK-DEPLOY.md`
- Make changes: See "Making Updates" below

---

## 📝 Making Updates Later

After you change files:

```bash
# See what changed
git status

# Stage all changes
git add .

# Commit with message
git commit -m "Describe what you changed"

# Push to GitHub
git push
```

---

## 🆘 Problems?

### "Authentication failed"
- Make sure you used the Personal Access Token, not your password
- Generate a new token if needed

### "Repository not found"
- Check your GitHub username in the URL
- Make sure the repository exists on GitHub

### "Permission denied"
- Check you're using HTTPS URL (starts with `https://`)
- Not SSH URL (starts with `git@github.com`)

### Still stuck?
- See `GITHUB-SETUP.md` for detailed troubleshooting
- Or check: https://docs.github.com/en/get-started
