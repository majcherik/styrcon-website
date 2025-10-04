import { useState, useEffect, RefObject } from 'react';

interface UseResizeObserverOptions<T extends HTMLElement = HTMLElement> {
  ref: RefObject<T>;
  onResize?: (size: { width: number; height: number }) => void;
  box?: 'content-box' | 'border-box' | 'device-pixel-content-box';
}

interface UseResizeObserverReturn {
  width?: number;
  height?: number;
}

/**
 * useResizeObserver - Track element size changes efficiently
 * Uses ResizeObserver API for performant element size tracking
 *
 * @param options - Configuration options including ref and callback
 * @returns Object with current width and height
 */
export function useResizeObserver<T extends HTMLElement = HTMLElement>({
  ref,
  onResize,
  box = 'content-box'
}: UseResizeObserverOptions<T>): UseResizeObserverReturn {
  const [size, setSize] = useState<{ width?: number; height?: number }>({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if ResizeObserver is supported
    if (typeof ResizeObserver === 'undefined') {
      console.warn('ResizeObserver is not supported in this browser');
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries.length) return;

      const entry = entries[0];
      let width: number;
      let height: number;

      if (box === 'border-box') {
        width = entry.borderBoxSize?.[0]?.inlineSize ?? entry.target.getBoundingClientRect().width;
        height = entry.borderBoxSize?.[0]?.blockSize ?? entry.target.getBoundingClientRect().height;
      } else if (box === 'device-pixel-content-box') {
        width = entry.devicePixelContentBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
        height = entry.devicePixelContentBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
      } else {
        // content-box (default)
        width = entry.contentBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
        height = entry.contentBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
      }

      const newSize = { width, height };
      setSize(newSize);
      onResize?.(newSize);
    });

    resizeObserver.observe(element, { box });

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, onResize, box]);

  return size;
}