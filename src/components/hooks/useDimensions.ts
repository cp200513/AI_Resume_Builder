// src/components/hooks/useDimensions.ts (CORRECTED)
import { useState, useEffect, RefObject } from "react";

// Corrected type for the ref parameter
const useDimensions = (ref: RefObject<HTMLDivElement | null>) => {
  // <--- FIX IS HERE
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      // Ensure ref.current is not null before accessing its properties
      if (ref.current) {
        setDimensions({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        });
      }
    };

    updateDimensions(); // Set initial dimensions

    // Add a ResizeObserver for more robust dimension tracking (optional, but good practice)
    let observer: ResizeObserver;
    if (ref.current) {
      observer = new ResizeObserver(updateDimensions);
      observer.observe(ref.current);
    }

    // Cleanup function
    return () => {
      window.removeEventListener("resize", updateDimensions);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [ref]);

  return dimensions;
};

export default useDimensions;
