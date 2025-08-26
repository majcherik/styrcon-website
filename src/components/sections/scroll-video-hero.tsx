'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { TextAnimate } from '@/components/magicui/text-animate';
import Link from 'next/link';

interface ScrollVideoHeroProps {
  videoSrc: string;
  className?: string;
}

export function ScrollVideoHero({ videoSrc, className = '' }: ScrollVideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Intersection Observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        
        if (!entry.isIntersecting && videoRef.current) {
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
      setIsVideoReady(true);
      // Auto-play video when ready
      videoRef.current.play().catch(console.error);
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
      className={`relative w-full h-screen ${className}`}
    >
      {/* Sticky Video Container */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center bg-stone-900">
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-cover"
          muted={isMuted}
          playsInline
          loop
          autoPlay
          preload="metadata"
          onLoadedMetadata={handleVideoLoad}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
            
            {/* Hero Content */}
            <div className="text-center max-w-4xl mx-auto mb-8">
              <TextAnimate 
                animation="blurInUp" 
                by="character" 
                className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-amber-200"
                as="h1"
                delay={0.5}
              >
                STYRCON
              </TextAnimate>
              
              <TextAnimate
                animation="blurInUp"
                by="word"
                className="block text-lg lg:text-2xl font-light text-stone-200 mt-4"
                delay={1.2}
              >
                Budúcnosť tepelnej izolácie
              </TextAnimate>
              
              <TextAnimate
                animation="blurIn"
                className="text-xl lg:text-2xl text-stone-100 mb-8 leading-relaxed font-light"
                delay={1.8}
              >
                Paropriepustné dosky triedy A1 pre moderné a bezpečné stavby
              </TextAnimate>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-amber-600 hover:bg-amber-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href="/styrcon-produkt">
                    Technické údaje
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="border-stone-300 text-white hover:bg-stone-100 hover:text-stone-900 transition-all duration-300"
                >
                  <Link href="/kontakt">
                    Kontakt
                  </Link>
                </Button>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-stone-300 text-sm mb-2">Scrollujte pre prehľad produktu</p>
              <div className="w-6 h-10 border-2 border-stone-300 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-stone-300 rounded-full animate-bounce mt-2"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Controls */}
        {isVideoReady && (
          <div className="absolute bottom-6 right-6 flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={togglePlay}
              className="bg-stone-800/60 hover:bg-stone-800/80 text-white border-stone-600 backdrop-blur-sm"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={toggleMute}
              className="bg-stone-800/60 hover:bg-stone-800/80 text-white border-stone-600 backdrop-blur-sm"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}


        {/* Loading State */}
        {!isVideoReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-stone-900">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
              <p className="text-stone-300">Načítavam video...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}