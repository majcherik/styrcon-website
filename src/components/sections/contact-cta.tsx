import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

export function ContactCTA() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Máte otázky o STYRCON?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Naši odborníci vám radi poskytnú technické poradenstvo a pomôžu s výberom 
            najvhodnejšieho riešenia pre váš projekt.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">
              Kontaktujte nás
            </h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">Telefón</div>
                  <div className="text-slate-600">+421 XXX XXX XXX</div>
                  <div className="text-sm text-slate-500">Po - Pi: 8:00 - 17:00</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">Email</div>
                  <div className="text-slate-600">info@e-ma-sk.com</div>
                  <div className="text-sm text-slate-500">Odpoveď do 24 hodín</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">Adresa</div>
                  <div className="text-slate-600">Bude doplnená</div>
                  <div className="text-sm text-slate-500">Slovenská republika</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/kontakt">
                  Kontaktný formulár
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link href="/na-stiahnutie">
                  Stiahnuť katalóg
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Info Card */}
          <Card className="p-8">
            <h4 className="text-xl font-semibold text-slate-900 mb-4">
              Rýchle informácie
            </h4>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Výrobca:</span>
                <span className="font-medium">Styrcon s.r.o.</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Partner:</span>
                <span className="font-medium">E-MA SK s.r.o.</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Certifikácia:</span>
                <span className="font-medium">CE označenie</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Trieda požiarnej bezpečnosti:</span>
                <span className="font-medium text-red-600">A1</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Dostupnosť:</span>
                <span className="font-medium text-green-600">Skladom</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary/5 rounded-lg">
              <div className="text-sm font-medium text-primary mb-1">
                Bezplatné technické poradenstvo
              </div>
              <div className="text-xs text-slate-600">
                Naši experti vám pomôžu s výpočtom tepelnoizolačných vlastností 
                a návrhem optimálneho riešenia.
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}