'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface MotionLayoutProps {
  children: ReactNode;
}

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 1.02,
  },
};

// Page transition configuration
const pageTransition = {
  type: "tween",
  ease: [0, 0, 0.2, 1],
  duration: 0.4,
};

// Stagger configuration for child elements
const containerVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export function MotionLayout({ children }: MotionLayoutProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={containerVariants}
        transition={pageTransition}
        className="min-h-screen w-full"
      >
        <motion.div
          variants={pageVariants}
          transition={pageTransition}
          className="w-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Hook for page-specific animations
export function usePageAnimation() {
  return {
    variants: pageVariants,
    transition: pageTransition,
    containerVariants,
  };
}

// Reusable motion components for sections
export const MotionSection = motion.section;
export const MotionDiv = motion.div;
export const MotionArticle = motion.article;

// Pre-configured section animation
export const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0, 0, 0.2, 1],
    },
  },
};

// Hero section specific animations
export const heroVariants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0, 0, 0.2, 1],
    },
  },
};