'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

export interface ScrollToTopProps {
  showAfter?: number;
  className?: string;
}

export function ScrollToTop({ showAfter = 400, className = '' }: ScrollToTopProps) {
  const { scrollY } = useScrollPosition({ debounceMs: 100 });
  const { copy } = useCopyToClipboard();

  const isVisible = scrollY > showAfter;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleRightClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const currentUrl = window.location.href;
    const success = await copy(currentUrl);
    if (success) {
      // Could add a toast notification here
      console.log('URL copied to clipboard');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          onContextMenu={handleRightClick}
          className={`
            fixed bottom-8 right-8 z-50
            w-12 h-12 rounded-full
            bg-primary text-primary-foreground
            shadow-lg hover:shadow-xl
            flex items-center justify-center
            transition-shadow duration-300
            ${className}
          `}
          title="Scroll to top (right-click to copy URL)"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}