import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Shield, Thermometer, Flame } from 'lucide-react';
import { CompactVideoTexture } from '@/components/video-texture/compact-video-texture';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 pt-20 pb-16 overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
              <span className="block text-primary">STYRCON</span>
              <span className="block text-2xl lg:text-3xl font-medium text-slate-600 mt-2">
                Paropriepustné tepelnoizolačné dosky
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Nehorľavé tepelnoizolačné dosky triedy A1 s výnimočnou paropriepustnosťou. 
              Ideálne pre sanačné zateplenie a moderné stavby.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button asChild size="lg">
                <Link href="/styrcon-produkt">
                  Technické údaje
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link href="/kontakt">
                  Kontaktovať nás
                </Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-slate-200">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="p-1 bg-red-100 rounded-full">
                  <Flame className="h-4 w-4 text-red-600" />
                </div>
                <span className="font-medium">Trieda A1 - nehorľavé</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="p-1 bg-blue-100 rounded-full">
                  <Thermometer className="h-4 w-4 text-blue-600" />
                </div>
                <span className="font-medium">Paropriepustné μ ≤ 3</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="p-1 bg-green-100 rounded-full">
                  <Shield className="h-4 w-4 text-green-600" />
                </div>
                <span className="font-medium">CE certifikované</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <Card className="aspect-square rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden">
              <CompactVideoTexture 
                videoUrl="10.mp4"
                fallbackImageUrl="10.jpg"
                className="w-full h-full"
              />
            </Card>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full opacity-60" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/20 rounded-full opacity-80" />
          </div>
        </div>
      </div>
    </section>
  );
}