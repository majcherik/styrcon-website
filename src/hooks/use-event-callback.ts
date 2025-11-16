import { useCallback, useRef } from 'react';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';

/**
 * useEventCallback
 *
 * A hook that creates a memoized event callback with a stable reference.
 * The callback always uses the latest function implementation, preventing stale closures.
 *
 * This is particularly useful for event handlers in complex components where you want
 * to avoid unnecessary re-renders while ensuring the callback always has access to
 * the latest props and state.
 *
 * @param fn - The callback function
 * @returns A memoized callback with a stable reference
 *
 * @example
 * ```tsx
 * function Component({ onComplete }) {
 *   const [count, setCount] = useState(0);
 *
 *   const handleClick = useEventCallback(() => {
 *     // Always uses latest count value
 *     console.log('Current count:', count);
 *     onComplete(count);
 *   });
 *
 *   return <button onClick={handleClick}>Click {count}</button>;
 * }
 * ```
 */
export function useEventCallback<Args extends unknown[], R>(
  fn: (...args: Args) => R,
): (...args: Args) => R;

export function useEventCallback<Args extends unknown[], R>(
  fn: ((...args: Args) => R) | undefined,
): ((...args: Args) => R) | undefined;

export function useEventCallback<Args extends unknown[], R>(
  fn: ((...args: Args) => R) | undefined,
): ((...args: Args) => R) | undefined {
  const ref = useRef<typeof fn>(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useIsomorphicLayoutEffect(() => {
    ref.current = fn;
  }, [fn]);

  return useCallback((...args: Args) => ref.current?.(...args), [ref]) as (
    ...args: Args
  ) => R;
}
