import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProductSpecs } from '@/components/sections/product-specs';
import { ContactCTA } from '@/components/sections/contact-cta';
import { Shield, Droplets, Thermometer, Flame, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'STYRCON Produkt - Technické parametre a vlastnosti | E-MA SK',
  description: 'Podrobné technické parametre STYRCON dosiek. Trieda A1, paropriepustnosť μ ≤ 3, tepelná vodivosť λ = 0,041 W/mK. Stiahnutie technických listov.',
  keywords: 'styrcon technické parametre, paropriepustné dosky vlastnosti, tepelná izolácia A1, nehorľavé dosky špecifikácie',
};

const keyFeatures = [
  {
    icon: <Flame className="h-6 w-6" />,
    title: 'Nehorľavosť A1',
    description: 'Najvyššia trieda požiarnej bezpečnosti podľa EN 13501-1',
    highlight: 'A1',
    color: 'red'
  },
  {
    icon: <Droplets className="h-6 w-6" />,
    title: 'Výnimočná paropriepustnosť',
    description: 'Faktor difúzneho odporu μ ≤ 3 umožňuje prirodzené vysychanie murív',
    highlight: 'μ ≤ 3',
    color: 'blue'
  },
  {
    icon: <Thermometer className="h-6 w-6" />,
    title: 'Nízka tepelná vodivosť',
    description: 'Výnimočné izolačné vlastnosti λ = 0,041 W/mK',
    highlight: '0,041 W/mK',
    color: 'green'
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Mechanická odolnosť',
    description: 'Pevnosť v tlaku ≥ 150 kPa pri 10% deformácii',
    highlight: '≥ 150 kPa',
    color: 'purple'
  }
];

export default function ProductPage() {
  return (
    <div className="pt-16">
      {/* Breadcrumb */}
      <div className="bg-slate-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate-600 hover:text-primary">
              Domov
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium">STYRCON Produkt</span>
          </nav>
        </div>
      </div>

      {/* Product Hero */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Shield className="h-4 w-4" />
                Trieda A1 - Nehorľavé
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                STYRCON
                <span className="block text-2xl lg:text-3xl font-medium text-slate-600 mt-2">
                  Paropriepustné tepelnoizolačné dosky
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Inovatívne tepelnoizolačné dosky z minerálnej vlny s výnimočnou 
                paropriepustnosťou a najvyššou triedou požiarnej bezpečnosti A1. 
                Ideálne riešenie pre sanačné zateplenie aj moderné stavby.
              </p>
              
              {/* Quick specs */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">A1</div>
                  <div className="text-sm text-slate-600">Reakcia na oheň</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">≤ 3</div>
                  <div className="text-sm text-slate-600">Faktor difúzneho odporu</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="#technicky-list">
                    Stiahnuť technický list
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg">
                  <Link href="/kontakt">
                    Požiadať o cenovú ponuku
                  </Link>
                </Button>
              </div>
            </div>

            {/* Product Image Placeholder */}
            <div className="relative">
              <Card className="aspect-square rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 p-8 flex items-center justify-center">
                <div className="w-full h-full bg-white/50 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🧱</div>
                    <div className="text-slate-600 font-medium">
                      STYRCON dosky
                    </div>
                    <div className="text-sm text-slate-500">
                      Produktová fotografia
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Kľúčové vlastnosti
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              STYRCON kombinuje najlepšie vlastnosti minerálnej vlny 
              s pokročilou technológiou výroby.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFeatures.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <div className={`
                  inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4
                  ${feature.color === 'red' ? 'bg-red-100 text-red-600' : ''}
                  ${feature.color === 'blue' ? 'bg-blue-100 text-blue-600' : ''}
                  ${feature.color === 'green' ? 'bg-green-100 text-green-600' : ''}
                  ${feature.color === 'purple' ? 'bg-purple-100 text-purple-600' : ''}
                `}>
                  {feature.icon}
                </div>
                <div className={`
                  text-2xl font-bold mb-2
                  ${feature.color === 'red' ? 'text-red-600' : ''}
                  ${feature.color === 'blue' ? 'text-blue-600' : ''}
                  ${feature.color === 'green' ? 'text-green-600' : ''}
                  ${feature.color === 'purple' ? 'text-purple-600' : ''}
                `}>
                  {feature.highlight}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <ProductSpecs />

      {/* Why Choose STYRCON */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Prečo zvoliť STYRCON?
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900">Bezpečnosť na prvom mieste</div>
                    <div className="text-sm text-slate-600">Trieda A1 zaručuje najvyššiu úroveň požiarnej bezpečnosti</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900">Prirodzené vysychanie</div>
                    <div className="text-sm text-slate-600">Paropriepustnosť μ ≤ 3 umožňuje odvod vlhkosti z konštrukcie</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900">Výnimočná izolácia</div>
                    <div className="text-sm text-slate-600">Nízka tepelná vodivosť λ = 0,041 W/mK pre energeticky efektívne budovy</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900">Dlhá životnosť</div>
                    <div className="text-sm text-slate-600">Odolnosť voči starnutiu a zachovanie vlastností po celú životnosť</div>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                Certifikácie a normy
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">CE označenie:</span>
                  <span className="font-medium text-green-600">✓ Certifikované</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">EN 13162:</span>
                  <span className="font-medium">Minerálna vlna</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">EN 13501-1:</span>
                  <span className="font-medium text-red-600">A1 - Nehorľavé</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">ISO 9001:</span>
                  <span className="font-medium text-green-600">✓ Certifikované</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-600">REACH:</span>
                  <span className="font-medium text-green-600">✓ Kompatibilné</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <ContactCTA />
    </div>
  );
}