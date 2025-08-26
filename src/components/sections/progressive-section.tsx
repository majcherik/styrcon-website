'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ProgressiveSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  threshold?: number;
}

export function ProgressiveSection({ 
  children, 
  className = '',
  delay = 0,
  direction = 'up',
  threshold = 0.1
}: ProgressiveSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // Only animate once
        }
      },
      {
        threshold,
        rootMargin: '50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 60, opacity: 0 };
      case 'down':
        return { y: -60, opacity: 0 };
      case 'left':
        return { x: 60, opacity: 0 };
      case 'right':
        return { x: -60, opacity: 0 };
      case 'fade':
      default:
        return { opacity: 0 };
    }
  };

  const getFinalPosition = () => {
    return { y: 0, x: 0, opacity: 1 };
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialPosition()}
      animate={isVisible ? getFinalPosition() : getInitialPosition()}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Custom ease
      }}
    >
      {children}
    </motion.div>
  );
}

// Specialized components for common use cases
export function ProgressiveCard({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <ProgressiveSection 
      className={`bg-stone-50 rounded-xl p-6 shadow-sm border border-stone-200 ${className}`}
      delay={delay}
      direction="up"
    >
      {children}
    </ProgressiveSection>
  );
}

export function ProgressiveFeature({ 
  icon, 
  title, 
  description, 
  highlight,
  color = 'amber',
  delay = 0 
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
  color?: 'amber' | 'green' | 'blue' | 'red' | 'stone';
  delay?: number;
}) {
  const colorClasses = {
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    green: 'bg-green-100 text-green-800 border-green-200',
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    red: 'bg-red-100 text-red-800 border-red-200',
    stone: 'bg-stone-100 text-stone-800 border-stone-200',
  };

  return (
    <ProgressiveCard delay={delay} className="text-center hover:shadow-md transition-shadow duration-300">
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${colorClasses[color]}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-stone-900 mb-2">{title}</h3>
      {highlight && (
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${colorClasses[color]}`}>
          {highlight}
        </div>
      )}
      <p className="text-stone-600 leading-relaxed">{description}</p>
    </ProgressiveCard>
  );
}