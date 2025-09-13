import React from 'react';
import Image from 'next/image';
import { cx } from '@/utils/cx';

export interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallbackText?: string;
}

const sizeClasses = {
  sm: 'h-6 w-6 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-10 w-10 text-base',
  xl: 'h-12 w-12 text-lg',
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  className,
  fallbackText
}) => {
  const initials = React.useMemo(() => {
    if (fallbackText) return fallbackText;
    
    return alt
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }, [alt, fallbackText]);

  const [imageError, setImageError] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  return (
    <div
      className={cx(
        'relative flex items-center justify-center rounded-full bg-gray-100 font-medium text-gray-600 overflow-hidden',
        sizeClasses[size],
        className
      )}
    >
      {src && !imageError ? (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            className={cx(
              'object-cover transition-opacity duration-200',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
            sizes="48px"
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-600">
              {initials}
            </div>
          )}
        </>
      ) : (
        <span className="select-none">{initials}</span>
      )}
    </div>
  );
};