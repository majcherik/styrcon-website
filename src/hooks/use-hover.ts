import { useState, useEffect, RefObject } from 'react';

/**
 * useHover - Track hover state for a DOM element
 * Returns boolean indicating if element is currently hovered
 *
 * @param elementRef - React ref object pointing to target element
 * @returns Boolean indicating hover state
 */
export function useHover<T extends HTMLElement>(
  elementRef: RefObject<T>
): boolean {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [elementRef]);

  return isHovered;
}