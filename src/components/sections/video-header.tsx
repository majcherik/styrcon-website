'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import TypingAnimation from '@/components/magicui/typing-animation';

export function VideoHeader() {
  return (
    <section className="relative min-h-[75vh] w-full overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster=""
        >
          <source src="https://i.imgur.com/EC9kkDP.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content overlay - Left aligned */}
      <div className="relative z-10 flex items-center justify-start min-h-[75vh] px-8 sm:px-12 lg:px-16">
        <div className="max-w-2xl">
          
          {/* Main heading with Typing Animation */}
          <div className="mb-8">
            <TypingAnimation
              text="E-MA SK s.r.o."
              duration={150}
              startDelay={500}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white drop-shadow-2xl mb-4 text-left"
            />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-white/95 leading-relaxed">
              Tepelná izolácia novej generácie
            </h2>
          </div>
          
          {/* Subtitle */}
          <p className="text-base sm:text-lg text-white/90 leading-relaxed font-light mb-10 max-w-lg">
            Paropriepustné dosky triedy A1 pre profesionálne zateplenie budov
          </p>
          
          {/* Action buttons - minimalistic */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="px-6 py-3 text-base bg-white text-gray-900 hover:bg-gray-100 border-none shadow-lg hover:shadow-xl transition-all duration-300 font-medium">
              <Link href="/styrcon-produkt">
                Technické údaje
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="px-6 py-3 text-base border-white/40 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 font-medium">
              <Link href="/kontakt">
                Kontakt
              </Link>
            </Button>
          </div>
          
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