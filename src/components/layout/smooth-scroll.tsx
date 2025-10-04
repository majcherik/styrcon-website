'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface SmoothScrollProps {
  intensity?: number;
}

export function SmoothScroll({ intensity = 15 }: SmoothScrollProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Only apply smooth scroll styles on homepage
    if (pathname === '/') {
      // Add smooth scroll class to html element
      document.documentElement.classList.add('smooth-scroll-active');
    } else {
      // Remove smooth scroll class from html element
      document.documentElement.classList.remove('smooth-scroll-active');
    }

    // Cleanup on unmount
    return () => {
      document.documentElement.classList.remove('smooth-scroll-active');
    };
  }, [pathname]);

  // Add global styles for smooth scrolling (only on homepage)
  useEffect(() => {
    // Only add styles on homepage
    if (pathname !== '/') {
      return;
    }

    // Add CSS for smooth scrolling
    const style = document.createElement('style');
    style.id = 'smooth-scroll-styles';
    style.textContent = `
      html.smooth-scroll-active {
        scroll-behavior: smooth !important;
      }

      html.smooth-scroll-active body {
        overflow-x: hidden;
      }

      /* Smooth scrolling for anchor links on homepage */
      html.smooth-scroll-active a[href^="#"] {
        scroll-behavior: smooth;
      }

      /* Prevent scroll restoration issues on homepage */
      html.smooth-scroll-active,
      html.smooth-scroll-active body {
        scroll-restoration: manual;
      }
    `;

    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById('smooth-scroll-styles');
      if (existingStyle && document.head.contains(existingStyle)) {
        document.head.removeChild(existingStyle);
      }
    };
  }, [pathname]);

  return null; // This component doesn't render anything
}

// Export hook for programmatic scroll control
export function useLenis() {
  return {
    scrollTo: (target: string | number, options?: any) => {
      if (typeof window !== 'undefined') {
        if (typeof target === 'string') {
          const element = document.querySelector(target);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', ...options });
          }
        } else {
          window.scrollTo({ top: target, behavior: 'smooth', ...options });
        }
      }
    },
    stop: () => {
      // No-op for CSS-based smooth scroll
    },
    start: () => {
      // No-op for CSS-based smooth scroll
    },
  };
}