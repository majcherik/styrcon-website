'use client';

import { useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface InfiniteSliderProps {
  children: ReactNode;
  speed?: number;
  speedOnHover?: number;
  gap?: number;
  className?: string;
}

export function InfiniteSlider({
  children,
  speed = 40,
  speedOnHover = 20,
  gap = 16,
  className = ''
}: InfiniteSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={sliderRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
      }}
    >
      <motion.div
        className="flex items-center"
        style={{ gap: `${gap}px` }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        whileHover={{
          animationDuration: `${speedOnHover}s`,
        }}
      >
        {/* First set of children */}
        {children}
        {/* Duplicate for seamless loop */}
        {children}
      </motion.div>
    </div>
  );
}