'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface SmoothScrollProps {
  intensity?: number;
}

export function SmoothScroll({ intensity = 15 }: SmoothScrollProps) {
  const lenisRef = useRef<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Only initialize smooth scroll on homepage
    if (pathname !== '/') {
      return;
    }

    // Dynamic import to avoid SSR issues
    const initializeLenis = async () => {
      try {
        const { default: Lenis } = await import('lenis');

        // Initialize Lenis
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          infinite: false,
        });

        lenisRef.current = lenis;

        // Expose to window for global access
        if (typeof window !== 'undefined') {
          (window as any).lenis = lenis;
        }

        // Animation frame loop
        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Handle overlay detection to pause scrolling
        const handleOverlayMutation = () => {
          const overlays = document.querySelectorAll('[data-overlay="true"], .modal, .dialog, [role="dialog"]');
          const hasActiveOverlay = Array.from(overlays).some((overlay) => {
            const style = window.getComputedStyle(overlay as Element);
            return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
          });

          if (hasActiveOverlay) {
            lenis.stop();
          } else {
            lenis.start();
          }
        };

        // Create mutation observer to watch for overlays
        const observer = new MutationObserver(handleOverlayMutation);
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['style', 'class', 'data-overlay'],
        });

        // Initial check
        handleOverlayMutation();

        // Cleanup function
        return () => {
          observer.disconnect();
          lenis.destroy();
          lenisRef.current = null;
          // Clear global window reference
          if (typeof window !== 'undefined' && (window as any).lenis === lenis) {
            delete (window as any).lenis;
          }
        };
      } catch (error) {
        console.warn('Failed to initialize Lenis:', error);
        return () => {}; // Return empty cleanup function
      }
    };

    // Initialize Lenis
    initializeLenis();
  }, [intensity, pathname]);

  // Add global styles for smooth scrolling (only on homepage)
  useEffect(() => {
    // Only add styles on homepage
    if (pathname !== '/') {
      return;
    }

    // Add CSS for smooth scrolling
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: auto !important;
      }
      
      body {
        overflow-x: hidden;
      }
      
      /* Smooth scrolling for anchor links */
      a[href^="#"] {
        scroll-behavior: smooth;
      }
      
      /* Prevent scroll restoration issues */
      html, body {
        scroll-restoration: manual;
      }
      
      /* Handle iframe scrolling */
      iframe {
        pointer-events: auto;
      }
      
      /* Optimize rendering for smooth scroll */
      * {
        scroll-behavior: auto;
      }
    `;
    
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [pathname]);

  return null; // This component doesn't render anything
}

// Export Lenis instance for programmatic control
export function useLenis() {
  return {
    scrollTo: (target: string | number, options?: any) => {
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.scrollTo(target, options);
      }
    },
    stop: () => {
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.stop();
      }
    },
    start: () => {
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }
    },
  };
}

// Add Lenis to window for global access
declare global {
  interface Window {
    lenis?: Lenis;
  }
}