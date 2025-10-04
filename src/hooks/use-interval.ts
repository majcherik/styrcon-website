import { useRef, useEffect } from 'react';

/**
 * useInterval - Declarative interval management
 * Provides pause/resume functionality and automatic cleanup
 *
 * @param callback - Function to execute at each interval
 * @param delay - Delay in milliseconds, or null to pause
 */
export function useInterval(
  callback: () => void,
  delay: number | null
): void {
  const savedCallback = useRef<(() => void) | null>(null);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}