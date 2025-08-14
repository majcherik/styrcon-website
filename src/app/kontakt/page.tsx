import type { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { ContactForm } from '@/components/forms/contact-form';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

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

      {/* Header */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Kontaktujte nás
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Naši odborníci vám radi poskytnú technické poradenstvo a pomôžu s výberom 
            najvhodnejšieho STYRCON riešenia pre váš projekt.
          </p>
        </div>
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
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                  Kontaktné informácie
                </h2>
                
                <div className="space-y-6">
                  <Card className="p-6">
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

                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 text-primary rounded-lg">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
                        <p className="text-slate-600 mb-1">info@e-ma-sk.com</p>
                        <p className="text-sm text-slate-500">Odpoveď do 24 hodín</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 text-primary rounded-lg">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-2">Adresa</h3>
                        <p className="text-slate-600 mb-1">Bude doplnená</p>
                        <p className="text-sm text-slate-500">Slovenská republika</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 text-primary rounded-lg">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-2">Pracovné hodiny</h3>
                        <div className="space-y-1 text-slate-600">
                          <p>Pondelok - Piatok: 8:00 - 17:00</p>
                          <p>Sobota - Nedeľa: Zatvorené</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Company Information */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  Informácie o spoločnosti
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Názov:</span>
                    <span className="font-medium">E-MA SK s.r.o.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">IČO:</span>
                    <span className="font-medium">XXXXXXXX</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">DIČ:</span>
                    <span className="font-medium">XXXXXXXXXX</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">IČ DPH:</span>
                    <span className="font-medium">SKXXXXXXXXXX</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Výrobca:</span>
                    <span className="font-medium">Styrcon s.r.o.</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">
                    Bezplatné služby
                  </h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Technické poradenstvo</li>
                    <li>• Výpočet tepelnoizolačných vlastností</li>
                    <li>• Návrh optimálneho riešenia</li>
                    <li>• Cenová ponuka na mieru</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Naša poloha
            </h2>
            <p className="text-slate-600">
              Presná adresa a mapa budú doplnené po dodaní údajov.
            </p>
          </div>
          
          <Card className="h-96 bg-slate-100 flex items-center justify-center">
            <div className="text-center text-slate-500">
              <MapPin className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Interaktívna mapa</p>
              <p className="text-sm">Bude pridaná po dodaní presnej adresy</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}