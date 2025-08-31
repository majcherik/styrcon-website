'use client';

import { motion, MotionValue } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';

interface AnimatedNavItemProps {
  href: string;
  isActive: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

interface AnimatedButtonProps {
  onClick: () => void;
  isActive: boolean;
  children: ReactNode;
  className?: string;
}

// Spring configuration for smooth animations
const springConfig = {
  type: "spring" as const,
  bounce: 0.2,
  duration: 0.6,
};

// Hover animation variants
const itemVariants = {
  idle: {
    scale: 1,
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
  hover: {
    scale: 1.02,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    transition: springConfig,
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

// Active indicator animation
const activeIndicatorVariants = {
  inactive: {
    opacity: 0,
    scale: 0.8,
  },
  active: {
    opacity: 1,
    scale: 1,
    transition: springConfig,
  },
};

// Icon animation variants
const iconVariants = {
  idle: {
    rotate: 0,
    scale: 1,
  },
  hover: {
    rotate: 5,
    scale: 1.1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.3,
    },
  },
  tap: {
    rotate: 0,
    scale: 0.9,
    transition: {
      duration: 0.1,
    },
  },
};

// Animated navigation link component
export function AnimatedNavItem({ 
  href, 
  isActive, 
  children, 
  onClick, 
  className = "" 
}: AnimatedNavItemProps) {
  return (
    <motion.div className="relative">
      {/* Active indicator with layoutId for smooth transitions */}
      {isActive && (
        <motion.div
          layoutId="navActiveIndicator"
          className="absolute inset-0 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-md"
          initial="inactive"
          animate="active"
          variants={activeIndicatorVariants}
          transition={springConfig}
        />
      )}
      
      {/* Navigation link */}
      <motion.div
        variants={itemVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        className="relative z-10"
      >
        <Link
          href={href}
          onClick={onClick}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ease-out ${className}`}
        >
          {children}
        </Link>
      </motion.div>
    </motion.div>
  );
}

// Animated button for dropdowns
export function AnimatedNavButton({ 
  onClick, 
  isActive, 
  children, 
  className = "" 
}: AnimatedButtonProps) {
  return (
    <motion.div className="relative">
      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="navActiveIndicator"
          className="absolute inset-0 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-md"
          initial="inactive"
          animate="active"
          variants={activeIndicatorVariants}
          transition={springConfig}
        />
      )}
      
      {/* Button */}
      <motion.button
        onClick={onClick}
        variants={itemVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ease-out ${className}`}
      >
        {children}
      </motion.button>
    </motion.div>
  );
}

// Animated icon wrapper
export function AnimatedIcon({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string; 
}) {
  return (
    <motion.div
      variants={iconVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Mobile menu item animation
export const mobileMenuItemVariants = {
  closed: {
    opacity: 0,
    x: -20,
  },
  open: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.05,
      duration: 0.3,
      ease: [0, 0, 0.2, 1],
    },
  }),
};

// Mobile menu container animation
export const mobileMenuContainerVariants = {
  closed: {
    opacity: 0,
    scale: 0.95,
    y: -10,
  },
  open: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0, 0, 0.2, 1],
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

// Dropdown animation variants
export const dropdownVariants = {
  closed: {
    opacity: 0,
    scale: 0.95,
    y: -10,
  },
  open: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0, 0, 0.2, 1],
      staggerChildren: 0.03,
    },
  },
};

// Dropdown item animation
export const dropdownItemVariants = {
  closed: {
    opacity: 0,
    x: -10,
  },
  open: {
    opacity: 1,
    x: 0,
  },
};