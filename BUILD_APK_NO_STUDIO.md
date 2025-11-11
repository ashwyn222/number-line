# Building APK Without Android Studio (macOS)

## 🎯 Best Options for macOS Users

---

## Option 1: GitHub Actions (Recommended - Free & Automated)

This builds your APK automatically in the cloud every time you push code!

### Setup Steps:

1. **Push your code to GitHub:**
```bash
cd /Users/ashwinkumar.sharma/Projects/num-line
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/num-line.git
git push -u origin main
```

2. **Create workflow file:**
Create `.github/workflows/build-android.yml` (I'll create this for you below)

3. **Push the workflow:**
```bash
git add .github/workflows/build-android.yml
git commit -m "Add Android build workflow"
git push
```

4. **Download APK:**
- Go to your GitHub repo
- Click **Actions** tab
- Click on the latest workflow run
- Download the APK artifact

**Pros:** ✅ Free, ✅ Automated, ✅ No local setup  
**Cons:** ⏱️ Takes 5-10 minutes per build

---

## Option 2: Ionic Appflow (Cloud Build - Easy)

Professional cloud build service, has free tier.

### Setup Steps:

1. **Install Ionic CLI:**
```bash
npm install -g @ionic/cli
```

2. **Login to Ionic:**
```bash
ionic login
```

3. **Link your app:**
```bash
ionic link
```

4. **Build in cloud:**
```bash
ionic package build android
```

5. **Download APK from Appflow dashboard**

**Pros:** ✅ Very easy, ✅ Professional  
**Cons:** 💰 Limited free builds, then paid

Website: https://ionic.io/appflow

---

## Option 3: Use Gradle Directly (Command Line Only)

Build APK using command line tools only (no Android Studio GUI).

### Setup Steps:

1. **Install Java JDK 17:**
```bash
brew install openjdk@17
echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

2. **Install Android Command Line Tools:**
```bash
# Download from: https://developer.android.com/studio#command-line-tools-only
# Or use homebrew:
brew install --cask android-commandlinetools
```

3. **Setup Android SDK:**
```bash
# Set environment variables
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Install required packages
sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0"
sdkmanager --licenses
```

4. **Setup Capacitor & Build:**
```bash
cd /Users/ashwinkumar.sharma/Projects/num-line
npm install
npm run build
npx cap add android
npx cap sync android
```

5. **Build APK with Gradle:**
```bash
cd android
./gradlew assembleDebug
```

6. **Find your APK:**
```bash
# APK location:
android/app/build/outputs/apk/debug/app-debug.apk
```

**Pros:** ✅ Free, ✅ Full control  
**Cons:** 🔧 More complex setup, 📦 Large download (~1GB)

---

## Option 4: Use Docker (Isolated Environment)

Build in a Docker container with everything pre-configured.

### Setup Steps:

1. **Install Docker Desktop:**
```bash
brew install --cask docker
```

2. **Create Dockerfile:** (I'll create this for you below)

3. **Build with Docker:**
```bash
docker build -t number-line-builder .
docker run -v $(pwd):/app number-line-builder
```

4. **Find APK in android/app/build/outputs/apk/debug/**

**Pros:** ✅ Clean, ✅ Isolated  
**Cons:** 📦 Requires Docker, ⏱️ Slower

---

## Option 5: Online Build Services

Use free online services to build APK:

### A. **Appcircle** (Free tier available)
- Website: https://appcircle.io
- Connect GitHub repo
- Auto-builds on push
- Download APK from dashboard

### B. **Codemagic** (Free tier - 500 min/month)
- Website: https://codemagic.io
- Connect GitHub repo
- Configure build
- Download APK

### C. **Bitrise** (Free tier available)
- Website: https://bitrise.io
- Connect repo
- Setup workflow
- Download artifacts

**Pros:** ✅ No local setup, ✅ Free tiers  
**Cons:** 📝 Requires account setup

---

## 🎯 My Recommendation for You

**For Quick Testing:** Use **GitHub Actions** (Option 1)
- Free
- Automated
- No local setup
- I'll provide the workflow file

**For Frequent Builds:** Use **Gradle CLI** (Option 3)
- One-time setup
- Fast local builds
- Full control

---

## 📝 Files I'll Create for You

1. `.github/workflows/build-android.yml` - GitHub Actions workflow
2. `Dockerfile` - Docker build configuration
3. `build-android.sh` - Helper script for Gradle CLI

---

## 💡 Quick Decision Guide

**Choose GitHub Actions if:**
- You want it to "just work"
- You don't mind waiting 5-10 minutes
- You want automated builds

**Choose Gradle CLI if:**
- You want fast local builds
- You're comfortable with terminal
- You'll be building frequently

**Choose Online Service if:**
- You want simplest setup
- You're okay with account signup
- You don't build often

---

Let me know which option you prefer, and I'll set it up for you! 🚀

