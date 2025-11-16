import { useEffect, useLayoutEffect } from 'react';

/**
 * useIsomorphicLayoutEffect
 *
 * A hook that uses useLayoutEffect on the client and useEffect on the server.
 * This prevents SSR warnings while maintaining the benefits of layout effects in the browser.
 *
 * @param effect - The effect callback function
 * @param deps - Optional dependency array
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
