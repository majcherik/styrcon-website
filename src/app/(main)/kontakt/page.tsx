import type { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { EnhancedContactForm } from '@/components/forms/enhanced-contact-form';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { StarsBackground } from '@/components/animate-ui/backgrounds/stars';

// Route segment config for optimal performance according to Next.js best practices
export const dynamic = 'force-static' // Static generation for contact info, form remains dynamic
export const revalidate = 7200 // 2 hours (contact info may change occasionally)
export const preferredRegion = ['fra1', 'ams1'] // European regions for Slovak market
export const maxDuration = 5
export const fetchCache = 'default-cache' // Use default fetch caching behavior

export const metadata: Metadata = {
  title: 'Kontakt - STYRCON | E-MA SK s.r.o.',
  description: 'Kontaktujte nás pre technické poradenstvo a cenové ponuky STYRCON tepelnoizolačných dosiek. Telefón, email a kontaktný formulár.',
  keywords: 'styrcon kontakt, tepelná izolácia kontakt, cenová ponuka styrcon, technické poradenstvo',
};

export default function ContactPage() {
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
            <span className="text-slate-900 font-medium">Kontakt</span>
          </nav>
        </div>
      </div>

      {/* Header with Animated Background */}
      <section className="py-8 relative overflow-hidden">
        <StarsBackground
          className="bg-background w-full"
          starColor="#000000"
          factor={0.03}
          speed={60}
          pointerEvents={true}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Kontaktujte nás
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Po vyplnení kontaktného formulára sa Vám ozveme
            </p>
          </div>
        </StarsBackground>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                Napíšte nám
              </h2>
              <EnhancedContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                  Kontaktné informácie
                </h2>
                
                <div className="space-y-6">
                  <Card className="p-6 border-0 shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 text-primary rounded-lg">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-2">Telefón</h3>
                        <p className="text-slate-600 mb-1">+421 XXX XXX XXX</p>
                        <p className="text-sm text-slate-500">Pre technické konzultácie a objednávky</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 border-0 shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 text-primary rounded-lg">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
                        <p className="text-slate-600 mb-1">e-ma@e-ma.sk</p>
                        <p className="text-sm text-slate-500"></p>
                      </div>
                    </div>
                  </Card>


                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}