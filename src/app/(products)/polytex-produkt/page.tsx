import type { Metadata } from 'next';
import Link from 'next/link';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Card } from '@/components/ui/card';
import { Shield, Heart, Droplets, CheckCircle, Sparkles, Beaker } from 'lucide-react';

// Route segment config for optimal performance according to Next.js best practices
export const dynamic = 'force-static' // Force static generation for better performance
export const revalidate = 86400 // 24 hours - appropriate for stable product information
export const preferredRegion = ['fra1', 'ams1'] // European regions for Slovak market
export const maxDuration = 10
export const fetchCache = 'default-cache' // Use default fetch caching behavior

// Static generation for pre-rendered pages
export async function generateStaticParams() {
  // Pre-generate static params for POLYTEX product variations
  const productVariants = [
    'polytex-actin-h',
    'polytex-premium',
    'polytex-classic'
  ]

  // Return static params for build time generation
  return productVariants.map((variant) => ({
    variant: variant,
  }))
}

export const metadata: Metadata = {
  title: 'POLYTEX Produkty - Hygienické farby pre interiér | E-MA SK',
  description: 'POLYTEX ACTIN H a PREMIUM hygienické farby so striebrom. Antibakteriálne, bez chemických konzervantov, ideálne pre citlivé osoby a alergikov.',
  keywords: 'polytex farby, hygienické farby, antibakteriálne farby, farby so striebrom, farby pre deti, zdravotné zariadenia',
};

const keyFeatures = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Bio kvalita',
    description: 'Bez chemických konzervantov, bezpečné pre deti a alergikov',
    highlight: '100% Bio',
    color: 'green'
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Antibakteriálne účinky',
    description: 'Obsahuje striebro, zabíja baktérie a plesne',
    highlight: 'Ag+',
    color: 'blue'
  },
  {
    icon: <Droplets className="h-6 w-6" />,
    title: 'Vysoko umývateľné',
    description: 'Trieda 1 umývateľnosti, odolné voči dezinfekčným prostriedkom',
    highlight: 'Trieda 1',
    color: 'purple'
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: 'Bez zápachu',
    description: 'Vodorozpustné, matný až saténový povrch',
    highlight: 'Eco',
    color: 'red'
  }
];

const products = [
  {
    name: 'POLYTEX ACTIN H',
    subtitle: 'Hygienická biofarba so striebrom',
    description: 'Inovatívna hygienická biofarba pre interiérové plochy. Bio kvalita bez chemických konzervantov, ideálna pre detské izby, citlivé osoby a alergikov.',
    features: [
      'Antibakteriálne účinky',
      'Bez chemických konzervantov',
      'Vodorozpustná, bez zápachu',
      'Matný povrch',
      'Vysoká priedušnosť',
      'Umývateľná'
    ],
    applications: [
      'Minerálne omietky',
      'Kvalitné sadrokartónové povrchy', 
      'Disperzné omietky',
      'Súdržné matné povrchové úpravy'
    ],
    imageUrl: 'https://www.e-ma.sk/imgcache/e-img-500.jpg?v=1632886730'
  },
  {
    name: 'POLYTEX ACTIN H PREMIUM',
    subtitle: 'Vysoko umývateľná hygienická farba so striebrom',
    description: 'Najodolnejšia interiérová farba od POLYTEX. Spĺňa najvyššie hygienické štandardy, zabíja baktérie a plesne, zdravotne bezpečná.',
    features: [
      'Najvyššia umývateľnosť (Trieda 1)',
      'Zabíja baktérie a plesne',
      'Zdravotne bezpečná',
      'Vhodná pre priamy kontakt s potravinami',
      'Odolná voči dezinfekčným prostriedkom',
      'Matný až saténový povrch'
    ],
    applications: [
      'Zdravotnícke zariadenia',
      'Potravinárske prevádzky',
      'Farmaceutické prostredia',
      'Veterinárne priestory',
      'Priestory s vysokou vlhkosťou',
      'Komerčné kuchyne'
    ],
    imageUrl: 'https://www.e-ma.sk/imgcache/e-img-449.jpg?v=1632883952'
  }
];

export default function PolytexProductPage() {
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
            <span className="text-slate-900 font-medium">POLYTEX Produkty</span>
          </nav>
        </div>
      </div>

      {/* Product Hero */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="h-4 w-4" />
              Bio kvalita - Bez chemických konzervantov
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              POLYTEX
              <span className="block text-2xl lg:text-3xl font-medium text-slate-600 mt-2">
                Hygienické farby so striebrom
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-4xl mx-auto">
              Inovatívne interiérové farby s antibakteriálnymi účinkami. Bio kvalita 
              bez chemických konzervantov, ideálne pre citlivé osoby, alergikov 
              a priestory s vysokými hygienickými nárokami.
            </p>
            
            <div className="flex justify-center">
              <AnimatedButton href="/polytex-galeria" size="lg" variant="primary">
                Pozrieť galériu
              </AnimatedButton>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Prečo POLYTEX
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Jedinečná kombinácia bio kvality, antibakteriálnych účinkov 
              a najvyšších hygienických štandardov.
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

      {/* Product Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              POLYTEX Produktová galéria
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Objavte kvalitu a profesionálne aplikácie POLYTEX hygienických farieb
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Card className="aspect-square rounded-2xl overflow-hidden bg-slate-50 hover:shadow-lg transition-all duration-200 p-4 flex items-center justify-center">
              <img
                src="https://www.e-ma.sk/imgcache/e-img-178.jpg?v=1632745927"
                alt="POLYTEX ACTIN H aplikácia"
                className="w-full h-full object-contain"
              />
            </Card>
            <Card className="aspect-square rounded-2xl overflow-hidden bg-slate-50 hover:shadow-lg transition-all duration-200 p-4 flex items-center justify-center">
              <img
                src="https://www.e-ma.sk/imgcache/e-img-179.jpg?v=1632745941"
                alt="POLYTEX PREMIUM v praxi"
                className="w-full h-full object-contain"
              />
            </Card>
            <Card className="aspect-square rounded-2xl overflow-hidden bg-slate-50 hover:shadow-lg transition-all duration-200 p-4 flex items-center justify-center">
              <img
                src="https://www.e-ma.sk/imgcache/e-img-180.jpg?v=1632745924"
                alt="POLYTEX hygienické vlastnosti"
                className="w-full h-full object-contain"
              />
            </Card>
            <Card className="aspect-square rounded-2xl overflow-hidden bg-slate-50 hover:shadow-lg transition-all duration-200 p-4 flex items-center justify-center md:col-span-1 lg:col-span-1">
              <img
                src="https://www.e-ma.sk/imgcache/e-img-103.jpg"
                alt="POLYTEX v zdravotníctve"
                className="w-full h-full object-contain"
              />
            </Card>
            <Card className="aspect-square rounded-2xl overflow-hidden bg-slate-50 hover:shadow-lg transition-all duration-200 p-4 flex items-center justify-center md:col-span-1 lg:col-span-1">
              <img
                src="https://www.e-ma.sk/imgcache/e-img-104.jpg"
                alt="POLYTEX profesionálne použitie"
                className="w-full h-full object-contain"
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {products.map((product, index) => (
              <div key={index} className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <Beaker className="h-4 w-4" />
                  {index === 0 ? 'Standard' : 'Premium'}
                </div>
                
                <h3 className="text-3xl font-bold text-slate-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-lg text-primary font-medium mb-4">
                  {product.subtitle}
                </p>
                
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  {/* Features */}
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-4">Kľúčové vlastnosti:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Applications */}
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-4">Použitie:</h4>
                    <ul className="space-y-2 text-slate-600">
                      {product.applications.map((app, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Info */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Technické informácie
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900">Farebnosť</div>
                    <div className="text-sm text-slate-600">Tónovateľné podľa farebných systémov</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900">Environmentálna bezpečnosť</div>
                    <div className="text-sm text-slate-600">Bezpečné pre ľudí, zvieratá a rastliny</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900">Aplikácia</div>
                    <div className="text-sm text-slate-600">Štandardné maľovanie štětcom, valčekom alebo striekaním</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-900">Údržba</div>
                    <div className="text-sm text-slate-600">Jednoduché čistenie bežnými čistiacimi prostriedkami</div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
}