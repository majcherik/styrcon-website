'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { Button } from '@/components/ui/button';
import { Play, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroVideoDialogProps {
  videoSrc: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  title?: string;
  description?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animationStyle?: 'none' | 'fade' | 'scale';
}

const sizeClasses = {
  sm: 'w-48 h-27',
  md: 'w-64 h-36', 
  lg: 'w-80 h-45',
  xl: 'w-96 h-54'
};

export function HeroVideoDialog({
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = 'Video thumbnail',
  title,
  description,
  className,
  size = 'lg',
  animationStyle = 'scale'
}: HeroVideoDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Extract YouTube video ID if it's a YouTube URL
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const getYouTubeEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  };

  const getYouTubeThumbnail = (videoId: string, quality: string = 'maxresdefault') => {
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  };

  const videoId = getYouTubeVideoId(videoSrc);
  const embedUrl = videoId ? getYouTubeEmbedUrl(videoId) : videoSrc;
  const defaultThumbnail = videoId ? getYouTubeThumbnail(videoId) : thumbnailSrc;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div 
          className={cn(
            'relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300',
            sizeClasses[size],
            animationStyle === 'scale' && 'hover:scale-105',
            animationStyle === 'fade' && 'hover:opacity-90',
            className
          )}
        >
          {/* Thumbnail */}
          <div className="absolute inset-0">
            <img
              src={defaultThumbnail || '/placeholder-video.jpg'}
              alt={thumbnailAlt}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
            
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Play className="w-6 h-6 text-slate-900 ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
          
          {/* Title and description overlay */}
          {(title || description) && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
              {title && (
                <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-white/80 text-xs line-clamp-2">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>{title || 'Video Player'}</DialogTitle>
        </VisuallyHidden>
        <div className="relative aspect-video">
          {videoId ? (
            <iframe
              src={embedUrl}
              title="Video player"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={videoSrc}
              className="w-full h-full"
              controls
              autoPlay
            />
          )}
          
          {/* Close button */}
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Video info */}
        {(title || description) && (
          <div className="p-6 bg-white">
            {title && (
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-slate-600">
                {description}
              </p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}