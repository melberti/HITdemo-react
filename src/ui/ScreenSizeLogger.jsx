import { useEffect, useState } from "react";
import { useMedia } from "../context/MediaQueryContext";

export default function ScreenSizeLogger({ show }) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { isSmall, isMedium, isLarge } = useMedia();

  // Helper to match default Tailwind breakpoints
  const getTailwindBreakpoint = (width) => {
    if (width >= 1536) return "2xl";
    if (width >= 1280) return "xl";
    if (width >= 1024) return "lg";
    if (width >= 768) return "md";
    if (width >= 640) return "sm";
    return "default (mobile)";
  };

  const [breakpoint, setBreakpoint] = useState();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({ width, height });

      const bp = getTailwindBreakpoint(width);
      setBreakpoint(bp);

      //show &&
      //console.log(`Width: ${width}px, Height: ${height}px | Tailwind: ${bp}`);
    };

    // Log initial size on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [show, setBreakpoint]);

  if (!show) return null;

  return (
    <div className="text-primary-orange size-logger block text-center text-sm">
      TW - {breakpoint} | isSmall - {String(isSmall)} | isMedium -{" "}
      {String(isMedium)} | isLarge - {String(isLarge)}
    </div>
  );
}
