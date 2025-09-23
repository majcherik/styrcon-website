import { useState, useEffect } from 'react';
import { useDebounce } from './use-debounce';

export interface WindowSize {
  width: number;
  height: number;
}

export interface UseWindowSizeOptions {
  debounceMs?: number;
  initialWidth?: number;
  initialHeight?: number;
}

export const useWindowSize = (options: UseWindowSizeOptions = {}): WindowSize => {
  const {
    debounceMs = 100,
    initialWidth = 1024,
    initialHeight = 768
  } = options;

  // Initialize with fallback values for SSR
  const [windowSize, setWindowSize] = useState<WindowSize>(() => {
    if (typeof window !== 'undefined') {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
    return {
      width: initialWidth,
      height: initialHeight,
    };
  });

  // Debounce the window size for better performance
  const debouncedWindowSize = useDebounce(windowSize, debounceMs);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return debouncedWindowSize;
};