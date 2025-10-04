import { useState, useEffect, RefObject } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface UseMousePositionOptions {
  includeTouch?: boolean;
  transform?: (position: MousePosition) => MousePosition;
  throttleMs?: number;
}

/**
 * useMousePosition - Track mouse cursor position
 * Provides real-time mouse coordinates for interactive effects
 *
 * @param options - Configuration options for tracking behavior
 * @returns Object with current x and y coordinates
 */
export function useMousePosition(options: UseMousePositionOptions = {}): MousePosition {
  const { includeTouch = false, transform, throttleMs = 0 } = options;

  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: NodeJS.Timeout | null = null;

    const updateMousePosition = (clientX: number, clientY: number) => {
      const newPosition = { x: clientX, y: clientY };
      const finalPosition = transform ? transform(newPosition) : newPosition;

      if (throttleMs > 0) {
        if (timeoutId) return;
        timeoutId = setTimeout(() => {
          setMousePosition(finalPosition);
          timeoutId = null;
        }, throttleMs);
      } else {
        setMousePosition(finalPosition);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      updateMousePosition(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        updateMousePosition(touch.clientX, touch.clientY);
      }
    };

    // Add mouse event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Add touch event listener if requested
    if (includeTouch) {
      window.addEventListener('touchmove', handleTouchMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (includeTouch) {
        window.removeEventListener('touchmove', handleTouchMove);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [includeTouch, transform, throttleMs]);

  return mousePosition;
}

/**
 * useRelativeMousePosition - Track mouse position relative to an element
 * Useful for creating element-specific interactive effects
 */
export function useRelativeMousePosition<T extends HTMLElement>(
  elementRef: RefObject<T>,
  options: UseMousePositionOptions = {}
): MousePosition & { isInside: boolean } {
  const { includeTouch = false, transform, throttleMs = 0 } = options;

  const [position, setPosition] = useState<MousePosition & { isInside: boolean }>({
    x: 0,
    y: 0,
    isInside: false
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const element = elementRef.current;
    if (!element) return;

    let timeoutId: NodeJS.Timeout | null = null;

    const updatePosition = (clientX: number, clientY: number) => {
      const rect = element.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const relativeY = clientY - rect.top;
      const isInside = relativeX >= 0 && relativeX <= rect.width && relativeY >= 0 && relativeY <= rect.height;

      const newPosition = { x: relativeX, y: relativeY };
      const finalPosition = transform ? transform(newPosition) : newPosition;

      const result = { ...finalPosition, isInside };

      if (throttleMs > 0) {
        if (timeoutId) return;
        timeoutId = setTimeout(() => {
          setPosition(result);
          timeoutId = null;
        }, throttleMs);
      } else {
        setPosition(result);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      updatePosition(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    const handleMouseLeave = () => {
      setPosition(prev => ({ ...prev, isInside: false }));
    };

    // Add event listeners to the window for global tracking
    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    if (includeTouch) {
      window.addEventListener('touchmove', handleTouchMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (includeTouch) {
        window.removeEventListener('touchmove', handleTouchMove);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [elementRef, includeTouch, transform, throttleMs]);

  return position;
}

/**
 * Utility function to normalize mouse position to 0-1 range
 * Useful for creating normalized interactive effects
 */
export function normalizeMousePosition(
  position: MousePosition,
  width: number,
  height: number
): MousePosition {
  return {
    x: width > 0 ? Math.max(0, Math.min(1, position.x / width)) : 0,
    y: height > 0 ? Math.max(0, Math.min(1, position.y / height)) : 0
  };
}

/**
 * Utility function to calculate distance from center
 * Useful for radial effects and distance-based interactions
 */
export function getDistanceFromCenter(
  position: MousePosition,
  centerX: number,
  centerY: number
): number {
  const deltaX = position.x - centerX;
  const deltaY = position.y - centerY;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}