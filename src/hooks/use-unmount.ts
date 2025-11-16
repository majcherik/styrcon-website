import { useEffect, useRef } from 'react';

/**
 * useUnmount
 *
 * A hook that runs a cleanup function when the component is unmounted.
 * The function reference is always kept up to date, so you can safely
 * use the latest values in your cleanup logic.
 *
 * @param func - The cleanup function to execute on unmount
 *
 * @example
 * ```tsx
 * function Component() {
 *   useUnmount(() => {
 *     console.log('Component unmounted');
 *     // Clean up subscriptions, timers, etc.
 *   });
 *
 *   return <div>Hello</div>;
 * }
 * ```
 */
export function useUnmount(func: () => void): void {
  const funcRef = useRef(func);

  funcRef.current = func;

  useEffect(
    () => () => {
      funcRef.current();
    },
    [],
  );
}
