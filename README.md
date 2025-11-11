# Number Line PWA

An interactive infinite number line explorer with smooth zoom and pan functionality.

## Features

- 🎯 **Smooth Pan**: Drag to explore the number line with momentum physics
- 🔍 **Adaptive Zoom**: Scroll to zoom in/out with intelligent tick spacing
- 📱 **Touch Support**: Pinch-to-zoom on mobile devices
- 🎨 **Beautiful Design**: Matches Figma design specifications exactly
- ⚡ **High Performance**: Hardware-accelerated animations
- 📦 **Progressive Web App**: Installable on all devices

## User Experience

- **Pan**: Click and drag or swipe to move along the number line
- **Zoom**: Use mouse wheel or pinch gesture to zoom in/out
- **Adaptive Ticks**: Tick marks and labels automatically adjust based on zoom level
- **Snap to Zero**: Quick button to return to center
- **Smooth Animations**: No lag, ultra-smooth 60fps animations
- **Edge Fading**: Numbers gracefully fade near viewport edges

## Tech Stack

- React 18
- TypeScript
- Vite
- Motion (Framer Motion)
- Tailwind CSS
- Lucide Icons
- PWA Support

## Getting Started

### Install Dependencies

```bash
npm install
```

### Generate PWA Icons

**Option 1: Using Node (requires sharp)**

```bash
npm run generate-icons
```

**Option 2: Using Browser (no dependencies)**

1. Open `generate-icons-simple.html` in your browser
2. Click "Generate Icons"
3. Right-click each canvas and save as `icon-192.png` and `icon-512.png` in the `public/` folder

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Design Specifications

This PWA matches the exact Figma design specifications:

- **Colors**: Slate gradient background (#020617 to #0f172a), cyan highlights (#06b6d4)
- **Typography**: Default system font stack with proper weights
- **Spacing**: Consistent spacing matching design tokens
- **Components**: Custom button components matching design system
- **Animations**: Smooth transitions with cubic-bezier easing

## Performance Optimizations

- Hardware-accelerated transforms
- Efficient tick rendering (only visible range)
- Momentum physics with proper friction
- Optimized React re-renders
- Service worker for offline caching

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- PWA installation supported on all platforms

## License

MIT
