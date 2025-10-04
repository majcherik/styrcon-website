import { useState, useEffect, useRef } from 'react';

type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error';

interface UseScriptOptions {
  id?: string;
  removeOnUnmount?: boolean;
  shouldPreventLoad?: boolean;
}

// Cache for tracking loaded scripts
const scriptStatusCache = new Map<string, ScriptStatus>();
const scriptElementCache = new Map<string, HTMLScriptElement>();

/**
 * useScript - Dynamic script loading with status tracking
 * Handles external script loading with caching and error handling
 *
 * @param src - Script URL to load, or null to prevent loading
 * @param options - Configuration options for script loading
 * @returns Current script loading status
 */
export function useScript(
  src: string | null,
  options: UseScriptOptions = {}
): ScriptStatus {
  const {
    id,
    removeOnUnmount = false,
    shouldPreventLoad = false
  } = options;

  const [status, setStatus] = useState<ScriptStatus>(() => {
    if (!src || shouldPreventLoad) return 'idle';

    // Check if script is already loaded
    const cachedStatus = scriptStatusCache.get(src);
    if (cachedStatus) return cachedStatus;

    // Check if script element already exists in DOM
    const existingScript = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;
    if (existingScript) {
      return existingScript.readyState === 'loaded' || existingScript.readyState === 'complete' ? 'ready' : 'loading';
    }

    return 'idle';
  });

  const scriptIdRef = useRef<string>(id || src || '');

  useEffect(() => {
    // Don't load if no src, should prevent load, or if we're on server
    if (!src || shouldPreventLoad || typeof window === 'undefined') {
      return;
    }

    // Check cache first
    const cachedStatus = scriptStatusCache.get(src);
    if (cachedStatus === 'ready') {
      setStatus('ready');
      return;
    }

    // Check if script already exists in DOM
    let script = scriptElementCache.get(src);
    if (!script) {
      script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;
    }

    if (script) {
      // Script exists, check its status
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        setStatus('ready');
        scriptStatusCache.set(src, 'ready');
        return;
      } else {
        setStatus('loading');
        scriptStatusCache.set(src, 'loading');
      }
    } else {
      // Create new script element
      script = document.createElement('script');
      script.src = src;
      script.async = true;

      // Set ID if provided
      if (id) {
        script.id = id;
      }

      // Cache the script element
      scriptElementCache.set(src, script);

      setStatus('loading');
      scriptStatusCache.set(src, 'loading');
    }

    const handleLoad = () => {
      setStatus('ready');
      scriptStatusCache.set(src, 'ready');
    };

    const handleError = () => {
      setStatus('error');
      scriptStatusCache.set(src, 'error');
    };

    // Add event listeners
    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);

    // Append to document if not already there
    if (!script.parentElement) {
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      script?.removeEventListener('load', handleLoad);
      script?.removeEventListener('error', handleError);

      // Remove script if specified
      if (removeOnUnmount && script?.parentElement) {
        script.parentElement.removeChild(script);
        scriptStatusCache.delete(src);
        scriptElementCache.delete(src);
      }
    };
  }, [src, id, removeOnUnmount, shouldPreventLoad]);

  return status;
}

/**
 * Preload script without executing it
 * Useful for improving performance of critical scripts
 */
export function preloadScript(src: string): void {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'script';
  link.href = src;
  document.head.appendChild(link);
}

/**
 * Clear script cache
 * Useful for development or when scripts need to be reloaded
 */
export function clearScriptCache(): void {
  scriptStatusCache.clear();
  scriptElementCache.clear();
}