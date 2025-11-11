import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Card } from '@/components/ui/card';
import { ContactCTA } from '@/components/sections/contact-cta';
import { Building2, Users, Award, MapPin, Phone, Mail } from 'lucide-react';
import { getCompanyInfo } from '@/lib/cache/strategies';

export const metadata: Metadata = {
  title: 'O nás - E-MA SK s.r.o. | Obchodný partner STYRCON',
  description: 'E-MA SK s.r.o. je obchodným a exportným partnerom výrobcu Styrcon s.r.o. Špecializujeme sa na distribúciu paropriepustných tepelnoizolačných dosiek STYRCON.',
  keywords: 'E-MA SK s.r.o., STYRCON partner, tepelná izolácia, obchodný partner, export STYRCON',
};

export default async function AboutPage() {
  // Fetch cached company info
  const companyInfo = await getCompanyInfo();
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
            <span className="text-slate-900 font-medium">O nás</span>
          </nav>
        </div>
      </div>

      {/* Company Hero */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Building2 className="h-4 w-4" />
                Obchodný partner STYRCON
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                E-MA SK s.r.o.
                <span className="block text-2xl lg:text-3xl font-medium text-slate-600 mt-2">
                  Váš spoľahlivý partner pre tepelnú izoláciu
                </span>
              </h1>

              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Sme obchodným a exportným partnerom výrobcu Styrcon s.r.o.,
                špecializujeme sa na distribúciu vysokokvalitných paropriepustných
                tepelnoizolačných dosiek STYRCON.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <AnimatedButton href="/styrcon-produkt" size="lg" variant="primary">
                  Naše produkty
                </AnimatedButton>

                <AnimatedButton href="/kontakt" variant="outline" size="lg">
                  Kontaktujte nás
                </AnimatedButton>
              </div>
            </div>

            {/* Company Image */}
            <div className="relative">
              <Card className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50">
                <Image
                  src="https://www.e-ma.sk/imgcache/e-news-79.jpg?v=1632745952"
                  alt="E-MA SK s.r.o. - STYRCON tepelná izolácia"
                  width={400}
                  height={300}
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="w-full h-full object-cover"
                  priority={true}
                />
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Prečo si vybrať E-MA SK s.r.o.?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Naša hodnota spočíva v dlhodobom partnerskom vzťahu s výrobcom
              a odbornej znalosti produktov STYRCON.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Odborné poradenstvo
              </h3>
              <p className="text-slate-600 text-sm">
                Poskytujeme kompletnú technickú podporu a poradenstvo pre správnu aplikáciu STYRCON systémov.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Overená kvalita
              </h3>
              <p className="text-slate-600 text-sm">
                Dlhoročné partnerstvo s výrobcom Styrcon s.r.o. zaručuje najvyššiu kvalitu dodávaných materiálov.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Komplexné riešenia
              </h3>
              <p className="text-slate-600 text-sm">
                Od poradenstva cez dodávku materiálov až po technickú podporu pri realizácii projektov.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                O spoločnosti E-MA SK s.r.o.
              </h2>

              <div className="prose prose-lg prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed mb-4">
                  E-MA SK s.r.o. je oficiálnym obchodným a exportným partnerom
                  spoločnosti Styrcon s.r.o., ktorá vyrába na Slovensku tepelnú
                  izoláciu vlastnou originálnou patentovo chránenou technológiou
                  už od roku <strong>1991</strong>.
                </p>

                <p className="text-slate-700 leading-relaxed mb-4">
                  Naša spoločnosť sa špecializuje na distribúciu vysokokvalitných
                  paropriepustných tepelnoizolačných dosiek STYRCON, ktoré sú
                  ideálne pre zateplenie novostavieb, sanáciu starých budov
                  aj historických pamiatok.
                </p>

                <p className="text-slate-700 leading-relaxed">
                  Vďaka dlhoročnému partnerstvu s výrobcom dokážeme zabezpečiť
                  nielen dodávku materiálov, ale aj kompletnú technickú podporu
                  a odborné poradenstvo pre úspešnú realizáciu vašich projektov.
                </p>
              </div>
            </div>

            <Card className="p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                Kontaktné údaje
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-slate-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-900">E-MA SK s.r.o.</div>
                    <div className="text-sm text-slate-600">
                      Obchodný a exportný partner STYRCON
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-slate-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-900">Adresa</div>
                    <div className="text-sm text-slate-600">
                      Slovenská republika
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-slate-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-900">Telefón</div>
                    <Link
                      href="tel:+421000000000"
                      className="text-sm text-primary hover:underline"
                    >
                      +421 000 000 000
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-slate-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-900">Email</div>
                    <Link
                      href="mailto:info@e-ma.sk"
                      className="text-sm text-primary hover:underline"
                    >
                      info@e-ma.sk
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <AnimatedButton href="/kontakt" className="w-full" variant="primary">
                  Napíšte nám správu
                </AnimatedButton>
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