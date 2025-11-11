# Building Android APK for Number Line PWA

## Prerequisites

1. **Node.js & npm** (already installed ✅)
2. **Android Studio** - Download from https://developer.android.com/studio
3. **Java JDK 17** - Required by Android Studio

## Step-by-Step Instructions

### Step 1: Install Capacitor

```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
```

### Step 2: Initialize Capacitor

```bash
npx cap init "Number Line" "com.numberline.app" --web-dir=dist
```

### Step 3: Build Your Web App

```bash
npm run build
```

### Step 4: Add Android Platform

```bash
npx cap add android
```

### Step 5: Copy Web Assets to Android

```bash
npx cap sync android
```

### Step 6: Open in Android Studio

```bash
npx cap open android
```

This will open Android Studio with your project.

### Step 7: Build APK in Android Studio

1. In Android Studio, go to **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. Wait for the build to complete
3. Click "locate" in the notification to find your APK
4. APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

### Step 8: For Release APK (Production)

1. Generate a signing key:
```bash
keytool -genkey -v -keystore number-line-key.keystore -alias number-line -keyalg RSA -keysize 2048 -validity 10000
```

2. In Android Studio:
   - Go to **Build → Generate Signed Bundle / APK**
   - Select **APK**
   - Choose your keystore file
   - Enter your passwords
   - Select **release** build variant
   - Click **Finish**

3. Release APK will be at: `android/app/release/app-release.apk`

---

## Quick Build Script

After initial setup, use this for rebuilding:

```bash
npm run build && npx cap sync android && npx cap open android
```

---

## Testing the APK

### Install on Physical Device

1. Enable Developer Options on your Android phone
2. Enable USB Debugging
3. Connect phone via USB
4. Run in terminal:
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Install on Emulator

1. Open Android Studio
2. Click **Run** button (green play icon)
3. Select or create an emulator
4. App will install and launch

---

## Troubleshooting

### Issue: "Command not found: adb"
**Solution:** Add Android SDK platform-tools to PATH:
```bash
export PATH=$PATH:~/Library/Android/sdk/platform-tools  # macOS
```

### Issue: Build fails in Android Studio
**Solution:** 
- Go to **File → Invalidate Caches / Restart**
- Clean project: **Build → Clean Project**
- Rebuild: **Build → Rebuild Project**

### Issue: App shows blank screen
**Solution:** Make sure you ran `npm run build` and `npx cap sync` before opening in Android Studio

---

## App Configuration

Edit `android/app/src/main/res/values/strings.xml` to customize:
- App name
- Theme colors

Edit `android/app/src/main/AndroidManifest.xml` for:
- Permissions
- Orientation settings
- Other Android-specific configs

---

## Next Steps

1. Test thoroughly on multiple devices
2. Generate release APK with signing key
3. Optimize app size if needed
4. Submit to Google Play Store (optional)

---

## File Sizes

- Debug APK: ~50-70 MB
- Release APK (optimized): ~20-40 MB
- After uploading to Play Store with App Bundle: ~10-20 MB download size

---

Your Number Line app is now ready to be distributed as a native Android app! 🎉

