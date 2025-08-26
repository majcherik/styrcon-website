'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextAnimateProps {
  children: string;
  animation?: 'fadeIn' | 'blurIn' | 'blurInUp' | 'blurInDown' | 'slideUp' | 'slideDown';
  by?: 'character' | 'word' | 'line';
  delay?: number;
  duration?: number;
  startOnView?: boolean;
  once?: boolean;
  className?: string;
  as?: React.ElementType;
}

const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  },
  blurIn: {
    initial: { opacity: 0, filter: 'blur(10px)' },
    animate: { opacity: 1, filter: 'blur(0px)' }
  },
  blurInUp: {
    initial: { opacity: 0, filter: 'blur(10px)', y: 20 },
    animate: { opacity: 1, filter: 'blur(0px)', y: 0 }
  },
  blurInDown: {
    initial: { opacity: 0, filter: 'blur(10px)', y: -20 },
    animate: { opacity: 1, filter: 'blur(0px)', y: 0 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 }
  }
};

function splitTextBy(text: string, by: 'character' | 'word' | 'line'): string[] {
  switch (by) {
    case 'character':
      return text.split('');
    case 'word':
      return text.split(' ');
    case 'line':
      return text.split('\n');
    default:
      return [text];
  }
}

export function TextAnimate({
  children,
  animation = 'fadeIn',
  by = 'character',
  delay = 0,
  duration = 0.5,
  startOnView = true,
  once = true,
  className,
  as: Component = 'div'
}: TextAnimateProps) {
  const animationConfig = animations[animation];
  const textParts = splitTextBy(children, by);

  if (by === 'character' || by === 'word') {
    return React.createElement(
      Component,
      { className: cn('inline-block', className) },
      textParts.map((part, index) => (
        <motion.span
          key={index}
          initial={animationConfig.initial}
          animate={startOnView ? undefined : animationConfig.animate}
          whileInView={startOnView ? animationConfig.animate : undefined}
          viewport={{ once }}
          transition={{
            duration,
            delay: delay + (index * 0.05),
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="inline-block"
          style={{ 
            marginRight: by === 'word' ? '0.25em' : undefined 
          }}
        >
          {part === ' ' ? '\u00A0' : part}
        </motion.span>
      ))
    );
  }

  // For line-by-line or single text animation
  return (
    <motion.div
      className={className}
      initial={animationConfig.initial}
      animate={startOnView ? undefined : animationConfig.animate}
      whileInView={startOnView ? animationConfig.animate : undefined}
      viewport={{ once }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {by === 'line' ? (
        textParts.map((line, index) => (
          <motion.div
            key={index}
            initial={animationConfig.initial}
            animate={startOnView ? undefined : animationConfig.animate}
            whileInView={startOnView ? animationConfig.animate : undefined}
            viewport={{ once }}
            transition={{
              duration,
              delay: delay + (index * 0.2),
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            {line}
          </motion.div>
        ))
      ) : (
        React.createElement(Component, { className }, children)
      )}
    </motion.div>
  );
}