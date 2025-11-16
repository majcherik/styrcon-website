import { useEffect, useState } from 'react';

/**
 * useIsClient
 *
 * A hook that determines if the code is running on the client side (in the browser).
 * Returns `false` during server-side rendering and `true` after the component mounts on the client.
 *
 * This is crucial for Next.js SSR to prevent hydration mismatches when using browser-only APIs
 * like window, document, localStorage, or navigator.
 *
 * @returns boolean - True if running on client, false if running on server
 *
 * @example
 * ```tsx
 * function Component() {
 *   const isClient = useIsClient();
 *
 *   if (!isClient) return null;
 *
 *   return <div>{window.innerWidth}</div>;
 * }
 * ```
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
