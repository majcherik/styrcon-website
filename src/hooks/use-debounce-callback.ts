import { useCallback, useEffect, useRef } from 'react';
import { useUnmount } from './use-unmount';

export type DebouncedState<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
};

/**
 * useDebounceCallback
 *
 * Creates a debounced version of a callback function that delays invoking the function
 * until after the specified delay has elapsed since the last time it was invoked.
 *
 * @param func - The function to debounce
 * @param delay - The delay in milliseconds (optional, defaults to undefined for no debounce)
 * @returns A debounced function with cancel and flush methods
 *
 * @example
 * ```tsx
 * function SearchInput() {
 *   const handleSearch = useDebounceCallback((query: string) => {
 *     console.log('Searching for:', query);
 *   }, 500);
 *
 *   return <input onChange={(e) => handleSearch(e.target.value)} />;
 * }
 * ```
 */
export function useDebounceCallback<T extends (...args: any[]) => any>(
  func: T,
  delay?: number,
): DebouncedState<T> {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const funcRef = useRef<T>(func);

  // Keep func reference up to date
  useEffect(() => {
    funcRef.current = func;
  }, [func]);

  // Cancel on unmount
  useUnmount(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  });

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const flush = useCallback(() => {
    cancel();
  }, [cancel]);

  const debouncedFunc = useCallback(
    (...args: Parameters<T>) => {
      // If no delay, call immediately
      if (!delay) {
        funcRef.current(...args);
        return;
      }

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        funcRef.current(...args);
        timeoutRef.current = null;
      }, delay);
    },
    [delay],
  );

  // Attach control methods
  const result = debouncedFunc as DebouncedState<T>;
  result.cancel = cancel;
  result.flush = flush;

  return result;
}
