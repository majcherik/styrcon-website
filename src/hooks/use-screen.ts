import { useState } from 'react';
import { useDebounceCallback } from './use-debounce-callback';
import { useEventListener } from './use-event-listener';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';

export type UseScreenOptions<InitializeWithValue extends boolean | undefined> = {
  /**
   * Whether to initialize the hook with the current screen value during SSR.
   * @default true
   */
  initializeWithValue: InitializeWithValue;
  /**
   * Optional delay in milliseconds to debounce screen updates.
   */
  debounceDelay?: number;
};

const IS_SERVER = typeof window === 'undefined';

/**
 * SSR version of useScreen - returns undefined initially
 */
export function useScreen(options: UseScreenOptions<false>): Screen | undefined;

/**
 * CSR version of useScreen - returns Screen immediately
 */
export function useScreen(options?: Partial<UseScreenOptions<true>>): Screen;

/**
 * useScreen
 *
 * A hook that tracks screen dimensions and properties including width, height,
 * orientation, color depth, and pixel depth. Updates on window resize events.
 *
 * @param options - Configuration options
 * @returns Screen object with current screen properties
 *
 * @example
 * ```tsx
 * function Component() {
 *   const screen = useScreen();
 *
 *   return (
 *     <div>
 *       <p>Screen: {screen?.width} x {screen?.height}</p>
 *       <p>Pixel Ratio: {screen?.pixelDepth}</p>
 *       <p>Orientation: {screen?.orientation?.type}</p>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With debouncing for better performance
 * function Component() {
 *   const screen = useScreen({ debounceDelay: 200 });
 *
 *   return <div>Width: {screen?.width}px</div>;
 * }
 * ```
 */
export function useScreen(
  options: Partial<UseScreenOptions<boolean>> = {},
): Screen | undefined {
  let { initializeWithValue = true } = options;

  if (IS_SERVER) {
    initializeWithValue = false;
  }

  const readScreen = (): Screen | undefined => {
    if (IS_SERVER) {
      return undefined;
    }
    return window.screen;
  };

  const [screen, setScreen] = useState<Screen | undefined>(() => {
    if (initializeWithValue) {
      return readScreen();
    }
    return undefined;
  });

  const debouncedSetScreen = useDebounceCallback(
    setScreen,
    options.debounceDelay,
  );

  function handleResize() {
    const newScreen = readScreen();
    const setSize = options.debounceDelay ? debouncedSetScreen : setScreen;

    if (newScreen) {
      const {
        width,
        height,
        availHeight,
        availWidth,
        colorDepth,
        orientation,
        pixelDepth,
      } = newScreen;

      setSize({
        width,
        height,
        availHeight,
        availWidth,
        colorDepth,
        orientation,
        pixelDepth,
      } as Screen);
    }
  }

  useEventListener('resize', handleResize);

  useIsomorphicLayoutEffect(() => {
    handleResize();
  }, []);

  return screen;
}
