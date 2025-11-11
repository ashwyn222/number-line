# Quick Setup Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Icons (First Time Only)
```bash
npm run generate-icons
```

### 3. Start Development Server
```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎮 How to Use

### Desktop
- **Pan**: Click and drag anywhere on the number line
- **Zoom**: Scroll up to zoom in, scroll down to zoom out
- **Snap to Zero**: Click the "Snap to Zero" button or the cyan button in the center

### Mobile
- **Pan**: Swipe left/right on the number line
- **Zoom**: Pinch gesture (two fingers)
- **Snap to Zero**: Tap the "Reset" button at the bottom

---

## 🎨 Features Implemented

✅ **Smooth Pan with Momentum** - Drag and release for natural momentum physics  
✅ **Adaptive Zoom** - Tick marks and labels adjust automatically based on zoom level  
✅ **Touch Gestures** - Full support for pinch-to-zoom on mobile devices  
✅ **Edge Fading** - Numbers fade gracefully near viewport edges  
✅ **Center Indicator** - Always shows which number is at the center  
✅ **Snap to Zero** - Quick button to return to the origin  
✅ **Ultra-Smooth Animations** - Hardware-accelerated, 60fps animations  
✅ **PWA Support** - Installable on all devices  

---

## 📱 PWA Installation

### Desktop (Chrome/Edge)
1. Open the app in browser
2. Click the install icon in the address bar
3. Click "Install"

### Mobile (iOS Safari)
1. Open the app in Safari
2. Tap the Share button
3. Tap "Add to Home Screen"

### Mobile (Android Chrome)
1. Open the app in Chrome
2. Tap the menu (three dots)
3. Tap "Add to Home Screen"

---

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## 🎯 Design Match

This PWA exactly matches the Figma design specifications:

- ✅ **Colors**: Slate-950 to Slate-900 gradient background
- ✅ **Accent**: Cyan-400 (#06b6d4) for highlights and center marker
- ✅ **Typography**: System font stack with proper weights
- ✅ **Spacing**: 60px base unit spacing between integers
- ✅ **Tick Marks**: Major ticks every 5 units, minor ticks every 1 unit
- ✅ **Animations**: Smooth cubic-bezier easing
- ✅ **Edge Gradients**: Fade zones on left and right edges

---

## 🔧 Performance

- **Optimized Rendering**: Only visible numbers are rendered
- **Hardware Acceleration**: CSS transforms for smooth movement
- **Efficient Updates**: React optimization to minimize re-renders
- **Service Worker**: Offline caching for instant loading

---

## 📦 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Motion** - Smooth animations (Framer Motion)
- **Tailwind CSS** - Styling
- **PWA Plugin** - Service worker and manifest generation

---

## 🐛 Troubleshooting

### Icons not showing?
Run `npm run generate-icons` to create the PNG icon files.

### App not smooth on mobile?
Make sure you're using a modern browser (iOS Safari 14+, Chrome 90+).

### Can't install as PWA?
The app must be served over HTTPS in production. Use `npm run preview` to test locally.

---

## 📄 License

MIT

