'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { VideoText } from '@/components/magicui/video-text';

export function VideoHeader() {
  return (
    <section className="relative min-h-[100vh] w-full overflow-hidden">
      {/* Full-screen video background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="" // Optional: add a poster image
        >
          <source src="https://i.imgur.com/OYH0nY9.mp4" type="video/mp4" />
          {/* Previous videos: /10.mp4, https://i.imgur.com/eoFESZQ.mp4 */}
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-[100vh] px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Main heading with VideoText */}
          <div className="mb-6 md:mb-8">
            <div className="h-[120px] sm:h-[150px] md:h-[200px] lg:h-[250px] xl:h-[300px] mb-4 md:mb-6">
              {/* Previous videos: /10.mp4, https://i.imgur.com/eoFESZQ.mp4 */}
              <VideoText 
                src="https://i.imgur.com/OYH0nY9.mp4"
                fontSize={12}
                fontWeight="900"
                className="w-full h-full"
                fontFamily="Inter, sans-serif"
              >
                STYRCON
              </VideoText>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white/90 leading-tight">
              Tepelná izolácia novej generácie
            </h2>
          </div>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed font-light mb-8 md:mb-12">
            Paropriepustné dosky triedy A1 pre profesionálne zateplenie budov a sanačné riešenia
          </p>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <Button asChild size="lg" className="px-8 py-4 text-lg md:text-xl bg-amber-600 hover:bg-amber-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="/styrcon-produkt">
                Technické údaje
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg md:text-xl border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
              <Link href="/kontakt">
                Kontakt
              </Link>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12 mt-12 md:mt-16 text-white/80">
            <span className="flex items-center gap-3 text-sm md:text-base">
              <span className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></span>
              <span className="font-medium">Trieda A1 - nehorľavé</span>
            </span>
            <span className="flex items-center gap-3 text-sm md:text-base">
              <span className="w-3 h-3 bg-blue-500 rounded-full shadow-lg"></span>
              <span className="font-medium">Paropriepustné μ ≤ 3</span>
            </span>
            <span className="flex items-center gap-3 text-sm md:text-base">
              <span className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></span>
              <span className="font-medium">CE certifikované</span>
            </span>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-white/70 text-sm mb-3">Scrollujte pre viac informácií</p>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full animate-bounce mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}