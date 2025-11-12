import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Shield, Droplets, Thermometer, Home } from 'lucide-react';

const features = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Nehorľavosť triedy A1',
    description: 'Najvyššia úroveň požiarnej bezpečnosti podľa EN 13501-1'
  },
  {
    icon: <Droplets className="h-6 w-6" />,
    title: 'Paropriepustnosť',
    description: 'Hodnota μ ≤ 3 umožňuje prirodzené odvlhčovanie konštrukcie'
  },
  {
    icon: <Thermometer className="h-6 w-6" />,
    title: 'Výnimočná tepelná izolácia',
    description: 'Tepelná vodivosť λ = 0,041 W/mK pre efektívne zateplenie'
  },
  {
    icon: <Home className="h-6 w-6" />,
    title: 'Univerzálne použitie',
    description: 'Vhodné pre novostavby, rekonštrukcie aj sanačné zateplenie'
  }
];

export function ProductOverview() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Prečo zvoliť STYRCON?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            STYRCON tepelnoizolačné dosky kombinujú najlepšie vlastnosti minerálnej vlny 
            s inovatívnou technológiou pre maximálnu efektívnosť a bezpečnosť.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-4">
                {feature.icon}
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

        {/* Key Specifications Preview */}
        <div className="bg-slate-50 rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">A1</div>
              <div className="text-sm font-medium text-slate-900 mb-1">Reakcia na oheň</div>
              <div className="text-xs text-slate-600">EN 13501-1</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">≤ 3</div>
              <div className="text-sm font-medium text-slate-900 mb-1">Faktor difúzneho odporu</div>
              <div className="text-xs text-slate-600">μ [-]</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">0,041</div>
              <div className="text-sm font-medium text-slate-900 mb-1">Tepelná vodivosť</div>
              <div className="text-xs text-slate-600">λ [W/mK]</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/styrcon-produkt">
              Zobraziť všetky technické parametre
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}