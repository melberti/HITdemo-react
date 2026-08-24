import { useEffect, useState } from "react";

export default function ScreenSizeLogger() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Helper to match default Tailwind breakpoints
  const getTailwindBreakpoint = (width) => {
    if (width >= 1536) return "2xl";
    if (width >= 1280) return "xl";
    if (width >= 1024) return "lg";
    if (width >= 768) return "md";
    if (width >= 640) return "sm";
    return "default (mobile)";
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({ width, height });

      console.log(
        `Width: ${width}px, Height: ${height}px | Tailwind: ${getTailwindBreakpoint(width)}`,
      );
    };

    // Log initial size on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-6 text-center">
      <p className="text-lg font-medium">
        Resize your window and check the browser console.
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Current: {windowSize.width}px × {windowSize.height}px
      </p>
    </div>
  );
}
