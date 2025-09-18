'use client';

import { cn } from '@/lib/utils';

interface ProgressiveBlurProps {
  direction: 'left' | 'right' | 'top' | 'bottom';
  blurIntensity?: number;
  className?: string;
}

export function ProgressiveBlur({
  direction,
  blurIntensity = 1,
  className
}: ProgressiveBlurProps) {
  const getGradientDirection = () => {
    switch (direction) {
      case 'left':
        return 'to right';
      case 'right':
        return 'to left';
      case 'top':
        return 'to bottom';
      case 'bottom':
        return 'to top';
      default:
        return 'to right';
    }
  };

  const blurStyles = {
    backdropFilter: `blur(${blurIntensity}px)`,
    WebkitBackdropFilter: `blur(${blurIntensity}px)`,
    background: `linear-gradient(${getGradientDirection()}, rgba(255,255,255,0.1), transparent)`,
  };

  return (
    <div
      className={cn('absolute inset-0', className)}
      style={blurStyles}
    />
  );
}