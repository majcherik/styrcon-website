'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScrollVideoPlayerProps {
  videoSrc: string;
  posterSrc?: string;
  className?: string;
  height?: string;
  showControls?: boolean;
}

export function ScrollVideoPlayer({
  videoSrc,
  posterSrc,
  className = '',
  height = '80vh',
  showControls = true,
}: ScrollVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    if (!containerRef.current || !videoRef.current || !isInView || !isVideoReady) return;

    const container = containerRef.current;
    const video = videoRef.current;
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate scroll progress through the container
    const containerTop = rect.top;
    const containerHeight = rect.height;
    
    // When container enters from bottom (containerTop = windowHeight) to exits from top (containerTop = -containerHeight)
    const scrollableDistance = windowHeight + containerHeight;
    const scrolled = windowHeight - containerTop;
    const scrollProgress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

    // Map scroll progress to video time
    const targetTime = scrollProgress * duration;
    
    // Only update if there's a significant difference to avoid jitter
    if (Math.abs(video.currentTime - targetTime) > 0.1) {
      video.currentTime = targetTime;
    }

    setProgress(scrollProgress);
  }, [isInView, duration, isVideoReady]);

  // Throttled scroll event
  useEffect(() => {
    let rafId: number;
    let isThrottled = false;

    const throttledScroll = () => {
      if (!isThrottled) {
        rafId = requestAnimationFrame(() => {
          handleScroll();
          isThrottled = false;
        });
        isThrottled = true;
      }
    };

    if (isInView) {
      window.addEventListener('scroll', throttledScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [handleScroll, isInView]);

  // Intersection Observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
        
        if (!entry.isIntersecting && videoRef.current) {
          // Pause video when out of view
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px',
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Video event handlers
  const handleVideoLoad = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsVideoReady(true);
      // Start paused
      videoRef.current.pause();
    }
  };

  const togglePlay = () => {
    if (!videoRef.current || !isVideoReady) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height }}
    >
      <div className="sticky top-0 w-full h-screen flex items-center justify-center bg-slate-900">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          className="w-full h-full object-cover"
          muted={isMuted}
          playsInline
          preload="metadata"
          onLoadedMetadata={handleVideoLoad}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Video Controls Overlay */}
        {showControls && isVideoReady && (
          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 group">
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              {/* Play/Pause Button */}
              <Button
                variant="secondary"
                size="sm"
                onClick={togglePlay}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>

              {/* Progress Bar */}
              <div className="flex-1 mx-4">
                <div className="w-full bg-white/20 rounded-full h-1">
                  <div 
                    className="bg-white h-1 rounded-full transition-all duration-100"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <div className="text-white/80 text-xs mt-1 text-center">
                  Scroll to control video progress
                </div>
              </div>

              {/* Mute Button */}
              <Button
                variant="secondary"
                size="sm"
                onClick={toggleMute}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {!isVideoReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading video...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}