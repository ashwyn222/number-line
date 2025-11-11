# 🚀 Quick Start: Build APK in 5 Minutes

## Prerequisites Check

✅ **Node.js installed** - You already have this  
⚠️ **Android Studio** - Download if you don't have: https://developer.android.com/studio  
⚠️ **JDK 17** - Comes with Android Studio

---

## Step-by-Step (Copy & Paste These Commands)

### 1️⃣ Install Capacitor Dependencies
```bash
cd /Users/ashwinkumar.sharma/Projects/num-line
npm install
```

### 2️⃣ Build Your Web App
```bash
npm run build
```

### 3️⃣ Add Android Platform (First Time Only)
```bash
npx cap add android
```

### 4️⃣ Sync Web Assets to Android
```bash
npx cap sync android
```

### 5️⃣ Open in Android Studio
```bash
npx cap open android
```

**Android Studio will open automatically!**

### 6️⃣ Build APK in Android Studio

Once Android Studio opens:

1. Wait for Gradle sync to complete (bottom right status bar)
2. Click **Build** menu → **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. Wait for build (2-5 minutes first time)
4. Click **locate** in the notification
5. Your APK is at: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🎯 For Future Builds (After First Setup)

Just run these 2 commands:

```bash
npm run android:build
npm run android:open
```

Then click **Build APK** in Android Studio again!

---

## 📱 Install APK on Your Phone

### Option A: Using Cable
1. Enable **Developer Options** on your phone
2. Enable **USB Debugging**
3. Connect phone via USB
4. Run:
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Option B: Transfer File
1. Email the APK to yourself
2. Open on phone
3. Install (you may need to allow "Install from Unknown Sources")

---

## 🎨 Customize App Icon

Before building, replace these files:

- `android/app/src/main/res/mipmap-hdpi/ic_launcher.png` (72×72)
- `android/app/src/main/res/mipmap-mdpi/ic_launcher.png` (48×48)
- `android/app/src/main/res/mipmap-xhdpi/ic_launcher.png` (96×96)
- `android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png` (144×144)
- `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png` (192×192)

Or use an icon generator: https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html

---

## 🔒 Production Release APK

When ready to publish:

```bash
# Generate signing key (one time)
keytool -genkey -v -keystore number-line.keystore -alias number-line -keyalg RSA -keysize 2048 -validity 10000
```

Then in Android Studio:
- **Build** → **Generate Signed Bundle / APK**
- Select **APK**
- Choose your keystore
- Select **release** variant

---

## ⚡ One-Line Build Command

After initial setup, use this:

```bash
npm run build && npx cap sync android && npx cap open android
```

---

## 📦 Expected APK Size

- Debug APK: ~50-70 MB
- Release APK: ~20-40 MB (optimized)

---

## 🐛 Common Issues

**"Android Studio won't open"**
```bash
# Make sure Android Studio is in Applications folder (macOS)
# Or add to PATH
```

**"Build failed - SDK not found"**
- Open Android Studio preferences
- SDK Manager → Install latest Android SDK

**"Blank screen in app"**
```bash
# Make sure you built first!
npm run build
npx cap sync android
```

---

## 🎉 That's It!

Your Number Line app is now a native Android APK ready to share or publish! 📱✨

For detailed instructions, see `BUILD_APK.md`

