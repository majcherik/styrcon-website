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
            Zaujal vás Styrcon a máte otázky? 
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-6">
            Radi vám poradíme s výberom vhodných produktov pre váš projekt.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">
              Kontaktujte nás
            </h3>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/kontakt">
                  Kontaktný formulár
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-center text-slate-500">
              <p>Očakávame váš kontakt!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}