import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="bg-white pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[600px]">
          
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6">
                Tepelná izolácia novej generácie
              </h1>
              
              <p className="text-xl lg:text-2xl text-slate-600 leading-relaxed font-light">
                STYRCON paropriepustné dosky triedy A1 pre profesionálne zateplenie budov a sanačné riešenia.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="px-8 py-4 text-lg">
                <Link href="/styrcon-produkt">
                  Technické údaje
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg">
                <Link href="/kontakt">
                  Demo
                </Link>
              </Button>
            </div>
            
            {/* Simple Trust Indicators */}
            <div className="flex items-center gap-8 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Trieda A1 - nehorľavé
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Paropriepustné μ ≤ 3
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                CE certifikované
              </span>
            </div>
          </div>

          {/* Video */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/10.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}