import { useState, useEffect } from 'react';
import { useDebounce } from './use-debounce';

export interface ScrollPosition {
  x: number;
  y: number;
}

export interface UseScrollPositionOptions {
  debounceMs?: number;
  element?: HTMLElement | Window;
}

export const useScrollPosition = (options: UseScrollPositionOptions = {}) => {
  const { debounceMs = 10, element } = options;

  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ x: 0, y: 0 });

  // Debounce the scroll position for better performance
  const debouncedScrollPosition = useDebounce(scrollPosition, debounceMs);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const targetElement = element || window;

    const updatePosition = () => {
      if (targetElement === window) {
        setScrollPosition({
          x: window.pageXOffset,
          y: window.pageYOffset,
        });
      } else if (targetElement instanceof HTMLElement) {
        setScrollPosition({
          x: targetElement.scrollLeft,
          y: targetElement.scrollTop,
        });
      }
    };

    // Set initial position
    updatePosition();

    targetElement.addEventListener('scroll', updatePosition);

    return () => {
      targetElement.removeEventListener('scroll', updatePosition);
    };
  }, [element]);

  return {
    scrollPosition: debouncedScrollPosition,
    scrollY: debouncedScrollPosition.y,
    scrollX: debouncedScrollPosition.x,
  };
};