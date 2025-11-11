'use client';

import { AnimatedButton } from '@/components/ui/animated-button';
import TypingAnimation from '@/components/magicui/typing-animation';

export function VideoHeader() {
  return (
    <section className="relative min-h-[75vh] md:min-h-[85vh] lg:min-h-[88vh] w-full overflow-hidden">
      {/* Background video - optimized for performance */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiIGZpbGw9IiMwZjE3MmEiLz48L3N2Zz4="
          onLoadStart={(e) => {
            // Optimize video loading for mobile
            const video = e.currentTarget;
            if (window.innerWidth < 768) {
              video.style.display = 'none';
            }
          }}
        >
          <source src="https://i.imgur.com/EC9kkDP.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content overlay - Left aligned */}
      <div className="relative z-10 flex items-center justify-start min-h-[75vh] md:min-h-[85vh] lg:min-h-[88vh] px-8 sm:px-12 lg:px-16">
        <div className="max-w-2xl">
          
          {/* Main heading with Typing Animation */}
          <div className="mb-8">
            <TypingAnimation
              text="E-MA SK s.r.o."
              duration={150}
              startDelay={500}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white drop-shadow-2xl mb-4 text-left whitespace-nowrap"
            />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-white/95 leading-relaxed">
              Tepelná izolácia novej generácie
            </h2>
          </div>
          
          {/* Subtitle */}
          <p className="text-base sm:text-lg text-white/90 leading-relaxed font-light mb-10 max-w-2xl whitespace-normal">
            Paropriepustné dosky triedy A1 pre profesionálne zateplenie budov
          </p>

          {/* Scroll indicator - moved to bottom right */}
          <div className="absolute bottom-8 right-8 text-right">
            <p className="text-white/60 text-xs mb-2">Scroll</p>
            <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center ml-auto">
              <div className="w-0.5 h-2 bg-white/50 rounded-full animate-bounce mt-1.5"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}