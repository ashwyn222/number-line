import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useAnimationFrame, animate } from "motion/react";
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "./components/ui/button";

// Define discrete zoom levels
const ZOOM_LEVELS = [
  { name: "4 levels out", scale: 0.02, tickInterval: 50, labelInterval: 50 },
  { name: "3 levels out", scale: 0.1, tickInterval: 10, labelInterval: 10 },
  { name: "2 levels out", scale: 0.2, tickInterval: 5, labelInterval: 5 },
  { name: "1 level out", scale: 0.5, tickInterval: 2, labelInterval: 2 },
  { name: "normal", scale: 1, tickInterval: 1, labelInterval: 1 },
  { name: "1 level in", scale: 2, tickInterval: 0.5, labelInterval: 0.5 },
  { name: "2 levels in", scale: 5, tickInterval: 0.1, labelInterval: 1 },
];

export default function App() {
  const [offset, setOffset] = useState(0);
  const [zoomLevelIndex, setZoomLevelIndex] = useState(4); // Start at 'normal' (index 4)
  const [isDragging, setIsDragging] = useState(false);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTouchDistanceRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentZoomLevel = ZOOM_LEVELS[zoomLevelIndex];
  const scale = currentZoomLevel.scale;

  const BASE_PIXELS_PER_UNIT = 60; // base pixels between each integer
  const PIXELS_PER_UNIT = BASE_PIXELS_PER_UNIT * scale;
  const VIEWPORT_PADDING = 5;

  // Calculate visible range based on viewport width and zoom level
  const getVisibleRange = useCallback(() => {
    if (!containerRef.current) return { start: -20, end: 20 };
    const width = containerRef.current.offsetWidth;
    const visibleUnits = Math.ceil(width / PIXELS_PER_UNIT);
    const center = (width / 2 - offset) / PIXELS_PER_UNIT;
    const start = Math.floor(center - visibleUnits / 2 - VIEWPORT_PADDING);
    const end = Math.ceil(center + visibleUnits / 2 + VIEWPORT_PADDING);
    return { start, end };
  }, [offset, PIXELS_PER_UNIT]);

  const [visibleRange, setVisibleRange] = useState(getVisibleRange());
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize offset to center the number line at 0
  useEffect(() => {
    if (!isInitialized && containerRef.current) {
      const viewportCenter = containerRef.current.offsetWidth / 2;
      setOffset(viewportCenter);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    setVisibleRange(getVisibleRange());
  }, [offset, scale, getVisibleRange]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => setVisibleRange(getVisibleRange());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getVisibleRange]);

  // Handle wheel zoom with discrete levels
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current) return;
      e.preventDefault();

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;

      // Calculate the world coordinate at mouse position
      const mouseWorldX = (mouseX - offset) / PIXELS_PER_UNIT;

      // Change zoom level
      const newIndex =
        e.deltaY > 0
          ? Math.max(0, zoomLevelIndex - 1) // Zoom out
          : Math.min(ZOOM_LEVELS.length - 1, zoomLevelIndex + 1); // Zoom in

      if (newIndex !== zoomLevelIndex) {
        const newScale = ZOOM_LEVELS[newIndex].scale;
        const newPixelsPerUnit = BASE_PIXELS_PER_UNIT * newScale;
        const newOffset = mouseX - mouseWorldX * newPixelsPerUnit;

        setZoomLevelIndex(newIndex);
        setOffset(newOffset);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => container.removeEventListener("wheel", handleWheel);
    }
  }, [zoomLevelIndex, offset, PIXELS_PER_UNIT]);

  // Handle touch pinch zoom
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        lastTouchDistanceRef.current = distance;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && containerRef.current) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );

        if (lastTouchDistanceRef.current > 0) {
          const rect = containerRef.current.getBoundingClientRect();
          const centerX = (touch1.clientX + touch2.clientX) / 2 - rect.left;

          // Calculate the world coordinate at the pinch center
          const worldX = (centerX - offset) / PIXELS_PER_UNIT;

          const scaleDelta = distance / lastTouchDistanceRef.current;

          // Determine new zoom level based on pinch direction
          let newIndex = zoomLevelIndex;
          if (scaleDelta < 0.9 && zoomLevelIndex > 0) {
            newIndex = zoomLevelIndex - 1; // Zoom out
          } else if (
            scaleDelta > 1.1 &&
            zoomLevelIndex < ZOOM_LEVELS.length - 1
          ) {
            newIndex = zoomLevelIndex + 1; // Zoom in
          }

          if (newIndex !== zoomLevelIndex) {
            const newScale = ZOOM_LEVELS[newIndex].scale;
            const newPixelsPerUnit = BASE_PIXELS_PER_UNIT * newScale;
            const newOffset = centerX - worldX * newPixelsPerUnit;

            setZoomLevelIndex(newIndex);
            setOffset(newOffset);
            lastTouchDistanceRef.current = distance; // Reset reference
          }
        } else {
          lastTouchDistanceRef.current = distance;
        }
      }
    };

    const handleTouchEnd = () => {
      lastTouchDistanceRef.current = 0;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      container.addEventListener("touchend", handleTouchEnd);
      return () => {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [scale, offset, PIXELS_PER_UNIT]);

  // Momentum animation with smooth deceleration
  useAnimationFrame((_t, delta) => {
    if (!isDragging && Math.abs(velocityRef.current) > 0.1) {
      velocityRef.current *= 0.95;
      setOffset((prev) => prev + velocityRef.current * (delta / 16));

      if (Math.abs(velocityRef.current) < 0.1) {
        velocityRef.current = 0;
      }
    }
  });

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    velocityRef.current = 0;
    lastXRef.current = e.clientX;
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastXRef.current;
    velocityRef.current = deltaX;
    lastXRef.current = e.clientX;
    setOffset((prev) => prev + deltaX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  // Touch drag handlers
  const handleTouchStartDrag = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      velocityRef.current = 0;
      lastXRef.current = e.touches[0].clientX;
    }
  };

  const handleTouchMoveDrag = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - lastXRef.current;
    velocityRef.current = deltaX;
    lastXRef.current = e.touches[0].clientX;
    setOffset((prev) => prev + deltaX);
  };

  const handleTouchEndDrag = () => {
    setIsDragging(false);
  };

  const snapToZero = () => {
    if (!containerRef.current) return;
    velocityRef.current = 0;
    const viewportCenter = containerRef.current.offsetWidth / 2;
    animate(offset, viewportCenter, {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (v) => setOffset(v),
    });
  };

  const zoomIn = () => {
    if (zoomLevelIndex < ZOOM_LEVELS.length - 1) {
      setZoomLevelIndex(zoomLevelIndex + 1);
    }
  };

  const zoomOut = () => {
    if (zoomLevelIndex > 0) {
      setZoomLevelIndex(zoomLevelIndex - 1);
    }
  };

  // Get tick and label intervals from current zoom level
  const tickInterval = currentZoomLevel.tickInterval;
  const labelInterval = currentZoomLevel.labelInterval;

  // Generate tick marks with adaptive spacing
  const renderTicks = () => {
    const ticks = [];
    const { start, end } = visibleRange;
    const interval = tickInterval;
    const startTick = Math.floor(start / interval) * interval;
    const endTick = Math.ceil(end / interval) * interval;

    // Check if we're at the decimal zoom level (2 levels in)
    const isDecimalZoom = zoomLevelIndex === 6; // "2 levels in" is index 6

    // Calculate number of steps to avoid floating point errors
    const numSteps = Math.round((endTick - startTick) / interval);

    for (let step = 0; step <= numSteps; step++) {
      // Calculate value using integer step to avoid accumulation errors
      const value = startTick + step * interval;
      // Round to appropriate decimal places based on interval
      const decimalPlaces = interval < 1 ? 1 : 0;
      const roundedValue = Number(value.toFixed(decimalPlaces));
      const x = roundedValue * PIXELS_PER_UNIT + offset;

      // Determine if this tick should have a label
      // Use integer division to avoid floating point issues
      const valueSteps = Math.round(roundedValue / interval);
      const labelSteps = Math.round(labelInterval / interval);
      const shouldShowLabel = valueSteps % labelSteps === 0;
      const isCenter = Math.abs(roundedValue) < 0.001;

      // For decimal zoom, check if this is a whole number
      const isWholeNumber = isDecimalZoom && Math.abs(roundedValue % 1) < 0.001;

      // Major ticks have labels, minor ticks don't
      // At decimal zoom, whole numbers are major ticks
      const isMajor = isDecimalZoom ? isWholeNumber : shouldShowLabel;
      const height = isMajor ? 40 : 20;

      // Calculate fade based on distance from viewport edges
      const viewportWidth = containerRef.current?.offsetWidth || 0;
      const centerX = viewportWidth / 2;
      const distanceFromCenter = Math.abs(x - centerX);
      const fadeZone = 200;
      const opacity =
        distanceFromCenter > viewportWidth / 2 - fadeZone
          ? Math.max(
              0,
              1 -
                (distanceFromCenter - (viewportWidth / 2 - fadeZone)) / fadeZone
            )
          : 1;

      ticks.push(
        <motion.g
          key={`${roundedValue}-${step}`}
          initial={{ opacity: 0 }}
          animate={{ opacity }}
          transition={{ duration: 0.2 }}
        >
          {/* Tick mark */}
          <line
            x1={x}
            y1={-height / 2}
            x2={x}
            y2={height / 2}
            stroke={isCenter ? "#06b6d4" : "#64748b"}
            strokeWidth={isMajor ? 2 : 1}
            className={
              isCenter ? "drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" : ""
            }
          />

          {/* Label for ticks that should show numbers */}
          {shouldShowLabel && (
            <text
              x={x}
              y={height / 2 + 25}
              textAnchor="middle"
              fill={isCenter ? "#06b6d4" : "#94a3b8"}
              fontSize={isDecimalZoom && !isWholeNumber ? "11" : "14"}
              className={
                isCenter ? "drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]" : ""
              }
              style={{ userSelect: "none" }}
            >
              {roundedValue.toFixed(interval < 1 ? 1 : 0)}
            </text>
          )}
        </motion.g>
      );
    }

    return ticks;
  };

  // Calculate the actual value at the center of the viewport
  const viewportCenter = containerRef.current?.offsetWidth
    ? containerRef.current.offsetWidth / 2
    : 0;
  const rawCenterValue = (viewportCenter - offset) / PIXELS_PER_UNIT;

  // Snap to nearest tick interval
  const snappedCenterValue =
    Math.round(rawCenterValue / tickInterval) * tickInterval;
  const currentCenter = snappedCenterValue.toFixed(tickInterval < 1 ? 1 : 0);

  // Calculate the X position of the snapped center for the crosshair
  const snappedCenterX = snappedCenterValue * PIXELS_PER_UNIT + offset;

  return (
    <div className="h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex flex-col overflow-hidden">
      {/* App Bar */}
      <div className="bg-slate-950/50 backdrop-blur-sm border-b border-slate-800 px-4 py-4 md:px-6 md:py-5">
        <div className="flex items-center mx-auto">
          <h1
            className="text-slate-100 tracking-tight"
            style={{
              fontFamily: "Limelight, cursive",
              fontSize: "24px",
              flexGrow: 1,
            }}
          >
            Number Line
          </h1>
          <div
            className="text-cyan-400 text-sm md:text-base"
            style={{
              position: "absolute",
              right: 0,
              left: 0,
              margin: "0 auto",
              width: "fit-content",
              fontSize: 40,
            }}
          >
            {" "}
            <span className="drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
              {currentCenter}
            </span>
          </div>
        </div>
      </div>

      {/* Number Line Container */}
      <div
        ref={containerRef}
        className="flex-1 relative flex items-center justify-center overflow-hidden"
      >
        {/* Edge fade overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />

        {/* SVG Number Line */}
        <svg
          className="w-full h-full"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStartDrag}
          onTouchMove={handleTouchMoveDrag}
          onTouchEnd={handleTouchEndDrag}
          style={{
            touchAction: "none",
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {/* Main horizontal line */}
          <line
            x1="0"
            y1="35%"
            x2="100%"
            y2="35%"
            stroke="#475569"
            strokeWidth="2"
            className="drop-shadow-[0_0_4px_rgba(71,85,105,0.5)]"
          />

          {/* Tick marks and labels */}
          <g
            transform={`translate(0, ${
              containerRef.current
                ? containerRef.current.offsetHeight * 0.35
                : 0
            })`}
          >
            {renderTicks()}
          </g>
        </svg>

        {/* Center indicator line - snapped to nearest tick */}
        <div
          className="absolute top-0 bottom-0 w-px bg-cyan-400/20 pointer-events-none transition-all duration-100"
          style={{ left: `${snappedCenterX}px` }}
        />
      </div>

      {/* Control Buttons */}
      <motion.div
        className="absolute bottom-6 md:bottom-8 right-6 md:right-8 flex items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          onClick={zoomOut}
          disabled={zoomLevelIndex <= 0}
          className="border-2 border-slate-600 hover:border-cyan-400 hover:bg-cyan-400/10 text-slate-300 hover:text-cyan-400 rounded-full h-10 w-10 p-0 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-600 disabled:hover:bg-transparent disabled:hover:text-slate-300 transition-all duration-200"
          size="sm"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          onClick={snapToZero}
          className="border-2 border-cyan-500 hover:bg-cyan-500 text-cyan-400 hover:text-white rounded-full px-4 md:px-6 gap-2 transition-all duration-200"
          size="sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden md:inline">Snap to Zero</span>
          <span className="md:hidden">Reset</span>
        </Button>
        <Button
          onClick={zoomIn}
          disabled={zoomLevelIndex >= ZOOM_LEVELS.length - 1}
          className="border-2 border-slate-600 hover:border-cyan-400 hover:bg-cyan-400/10 text-slate-300 hover:text-cyan-400 rounded-full h-10 w-10 p-0 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-600 disabled:hover:bg-transparent disabled:hover:text-slate-300 transition-all duration-200"
          size="sm"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
      </motion.div>

      {/* Instructions overlay */}
      <motion.div
        className="absolute top-24 left-1/2 -translate-x-1/2 text-slate-400 text-sm text-center pointer-events-none px-4"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <p>← Drag to pan • Scroll to zoom →</p>
      </motion.div>

      {/* Zoom level indicator */}
      <motion.div
        className="absolute top-24 right-6 text-slate-500 text-xs pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.5 }}
      >
        Zoom: {currentZoomLevel.name}
      </motion.div>
    </div>
  );
}
