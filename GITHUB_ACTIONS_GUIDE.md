# 🚀 Build APK with GitHub Actions (No Android Studio Needed!)

## What is this?
GitHub Actions will automatically build your APK in the cloud every time you push code. **100% free** for public repos!

---

## 📋 Quick Setup (5 Minutes)

### Step 1: Create GitHub Repository

If you haven't already:

```bash
cd /Users/ashwinkumar.sharma/Projects/num-line

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Number Line PWA"
```

Go to GitHub.com and:
1. Click **+** (top right) → **New repository**
2. Name it: `number-line`
3. Keep it **Public** (free Actions)
4. Click **Create repository**

### Step 2: Connect and Push

```bash
# Add GitHub as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/number-line.git

# Push code
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Actions

The workflow file is already in `.github/workflows/build-android.yml`

GitHub will automatically detect it and start building!

---

## 📱 Download Your APK

### After Push:

1. Go to your repo on GitHub
2. Click **Actions** tab
3. Click on the latest workflow run (should be green ✅)
4. Scroll down to **Artifacts** section
5. Click **number-line-debug-apk** to download
6. Unzip and install `app-debug.apk` on your Android device!

---

## 🎯 How to Trigger a Build

### Option 1: Push Code (Automatic)
```bash
# Make any change
git add .
git commit -m "Update app"
git push
```

Build starts automatically! ⚡

### Option 2: Manual Trigger
1. Go to **Actions** tab on GitHub
2. Click **Build Android APK** workflow
3. Click **Run workflow** button
4. Select branch (main)
5. Click green **Run workflow**

---

## 📦 Build Times

- First build: ~8-10 minutes (downloads dependencies)
- Subsequent builds: ~3-5 minutes (cached)

---

## 🎨 Create a Release

Want a permanent download link?

```bash
# Create and push a tag
git tag v1.0.0
git push origin v1.0.0
```

GitHub will create a Release with the APK attached!

---

## 🔍 Troubleshooting

### Build Failed?

1. Click on the failed workflow
2. Click on the **build** job
3. Expand failing step to see error
4. Common fixes:
   - Make sure `package.json` has all dependencies
   - Check that `npm run build` works locally
   - Verify all files are committed

### Can't Download Artifact?

- Artifacts expire after 30 days
- Must be logged into GitHub
- Workflow must complete successfully (green checkmark)

---

## 💰 Cost

**$0** - Completely free for public repositories!

---

## ⚡ Quick Commands Reference

```bash
# Push new changes
git add .
git commit -m "Your message"
git push

# Create release
git tag v1.0.0
git push origin v1.0.0

# Check status
git status
```

---

## 🎉 That's It!

Every time you push code, GitHub builds a fresh APK for you automatically!

**No Android Studio. No local setup. Just push and download!** 📱✨

---

## 📊 Workflow Runs On:

- ✅ Every push to `main` branch
- ✅ Every pull request
- ✅ Manual trigger (workflow_dispatch)
- ✅ Git tags (creates releases)

---

## 🔗 Useful Links

- Your Actions: `https://github.com/YOUR_USERNAME/number-line/actions`
- Your Releases: `https://github.com/YOUR_USERNAME/number-line/releases`
- GitHub Actions Docs: https://docs.github.com/en/actions

---

**Pro Tip:** Star your repo to easily find it later! ⭐

