import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';

// MediaQueryList Event based useEventListener interface
function useEventListener<K extends keyof MediaQueryListEventMap>(
  eventName: K,
  handler: (event: MediaQueryListEventMap[K]) => void,
  element: RefObject<MediaQueryList>,
  options?: boolean | AddEventListenerOptions,
): void;

// Window Event based useEventListener interface
function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions,
): void;

// Element Event based useEventListener interface
function useEventListener<
  K extends keyof HTMLElementEventMap & keyof SVGElementEventMap,
  T extends Element = K extends keyof HTMLElementEventMap
    ? HTMLDivElement
    : SVGElement,
>(
  eventName: K,
  handler:
    | ((event: HTMLElementEventMap[K]) => void)
    | ((event: SVGElementEventMap[K]) => void),
  element: RefObject<T>,
  options?: boolean | AddEventListenerOptions,
): void;

// Document Event based useEventListener interface
function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element: RefObject<Document>,
  options?: boolean | AddEventListenerOptions,
): void;

/**
 * useEventListener
 *
 * A hook that attaches event listeners to DOM elements, the window, or media query lists.
 * Automatically handles cleanup and maintains a stable handler reference.
 *
 * @param eventName - The name of the event to listen for
 * @param handler - The event handler function
 * @param element - Optional ref to the target element (defaults to window)
 * @param options - Optional event listener options
 *
 * @example
 * ```tsx
 * // Listen to window events
 * function Component() {
 *   useEventListener('resize', () => {
 *     console.log('Window resized');
 *   });
 *
 *   return <div>Resize the window</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Listen to element events
 * function Component() {
 *   const buttonRef = useRef<HTMLButtonElement>(null);
 *
 *   useEventListener('click', () => {
 *     console.log('Button clicked');
 *   }, buttonRef);
 *
 *   return <button ref={buttonRef}>Click me</button>;
 * }
 * ```
 */
function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap & keyof SVGElementEventMap,
  KM extends keyof MediaQueryListEventMap,
  T extends HTMLElement | SVGAElement | MediaQueryList = HTMLElement,
>(
  eventName: KW | KH | KM,
  handler: (
    event:
      | WindowEventMap[KW]
      | HTMLElementEventMap[KH]
      | SVGElementEventMap[KH]
      | MediaQueryListEventMap[KM]
      | Event,
  ) => void,
  element?: RefObject<T>,
  options?: boolean | AddEventListenerOptions,
) {
  const savedHandler = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement: T | Window = element?.current ?? window;

    if (!(targetElement && targetElement.addEventListener)) return;

    const listener: typeof handler = (event) => {
      savedHandler.current(event);
    };

    targetElement.addEventListener(eventName, listener, options);

    return () => {
      targetElement.removeEventListener(eventName, listener, options);
    };
  }, [eventName, element, options]);
}

export { useEventListener };
