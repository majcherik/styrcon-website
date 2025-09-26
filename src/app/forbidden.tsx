import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Shield, Home, Mail, Phone, FileText, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Prístup zakázaný - 403 | STYRCON - E-MA SK s.r.o.',
  description: 'Prístup k tejto stránke je obmedzený. Kontaktujte E-MA SK s.r.o. pre viac informácií o STYRCON produktoch.',
  robots: {
    index: false,
    follow: false,
  },
}

/**
 * 403 Forbidden Page for Slovak STYRCON Business
 * Professional Slovak error handling with business context
 */
export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl p-8 text-center shadow-xl">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-12 h-12 text-amber-600" />
          </div>

          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            403 - Prístup zakázaný
          </h1>

          <p className="text-lg text-slate-700 mb-6">
            K tejto stránke nemáte oprávnenie na prístup.
          </p>

          <div className="text-slate-600 mb-8 space-y-2">
            <p>
              Táto stránka môže obsahovať špecializované informácie o STYRCON produktoch,
              technické dokumenty alebo obchodné údaje E-MA SK s.r.o.
            </p>
            <p className="text-sm">
              Pre prístup k chráneným informáciám sa prosím prihlásте alebo kontaktujte nás.
            </p>
          </div>
        </div>

        {/* Slovak Business Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Contact Options */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 mb-3">
              Kontaktné možnosti
            </h3>

            <Button asChild variant="outline" size="sm" className="w-full justify-start">
              <Link href="/kontakt">
                <Mail className="w-4 h-4 mr-2" />
                Kontaktný formulár
              </Link>
            </Button>

            <Button asChild variant="outline" size="sm" className="w-full justify-start">
              <a href="tel:+421123456789">
                <Phone className="w-4 h-4 mr-2" />
                Zavolajte nám
              </a>
            </Button>

            <Button asChild variant="outline" size="sm" className="w-full justify-start">
              <Link href="/dokumenty">
                <FileText className="w-4 h-4 mr-2" />
                Verejné dokumenty
              </Link>
            </Button>
          </div>

          {/* Business Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 mb-3">
              Dostupné informácie
            </h3>

            <Button asChild variant="outline" size="sm" className="w-full justify-start">
              <Link href="/styrcon-produkt">
                <span className="w-4 h-4 mr-2 bg-blue-600 rounded-full flex-shrink-0"></span>
                STYRCON produkty
              </Link>
            </Button>

            <Button asChild variant="outline" size="sm" className="w-full justify-start">
              <Link href="/polytex-produkt">
                <span className="w-4 h-4 mr-2 bg-green-600 rounded-full flex-shrink-0"></span>
                POLYTEX materiály
              </Link>
            </Button>

            <Button asChild variant="outline" size="sm" className="w-full justify-start">
              <Link href="/aktuality">
                <FileText className="w-4 h-4 mr-2" />
                Aktuality a články
              </Link>
            </Button>
          </div>
        </div>

        {/* Main Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              Hlavná stránka
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/o-nas">
              <ArrowLeft className="w-5 h-5 mr-2" />
              O E-MA SK s.r.o.
            </Link>
          </Button>
        </div>

        {/* Business Information Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-sm text-slate-600">
            <p className="font-medium mb-2">E-MA SK s.r.o. - Distribútor STYRCON</p>
            <p>
              Špecializujeme sa na paropriepustné tepelnoizolačné dosky STYRCON
              a flexibilné materiály POLYTEX pre slovenský trh.
            </p>
            <p className="mt-2">
              <strong>Prečo STYRCON?</strong> Nehorľavé, paropriepustné dosky triedy A1
              ideálne pre zatepľovanie vlhkých stavieb a sanačné zateplenie.
            </p>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">
            Potrebujete pomoc s STYRCON riešením?
          </h4>
          <p className="text-sm text-blue-800 mb-3">
            Naši odborníci vám radi poradia s výberom vhodného tepelnoizolačného materiálu
            pre váš projekt.
          </p>
          <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/kontakt">
              Získajte bezplatnú konzultáciu
            </Link>
          </Button>
        </div>

        {/* Error Code for Technical Reference */}
        <div className="mt-6 text-xs text-slate-400">
          Chyba 403 - Prístup odmietnutý | E-MA SK s.r.o. | STYRCON distribútor Slovensko
        </div>
      </Card>
    </div>
  )
}