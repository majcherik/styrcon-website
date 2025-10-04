import { useRef, useEffect } from 'react';

/**
 * useTimeout - Declarative timeout management
 * Automatically handles cleanup and latest callback execution
 *
 * @param callback - Function to execute after delay
 * @param delay - Delay in milliseconds, or null to prevent timeout
 */
export function useTimeout(
  callback: () => void,
  delay: number | null
): void {
  const savedCallback = useRef<(() => void) | null>(null);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      const id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
}