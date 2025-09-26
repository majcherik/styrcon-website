import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Shield, ArrowLeft, LogIn } from 'lucide-react'

/**
 * Unauthorized page for handling authentication failures
 * Provides user-friendly Slovak language interface for STYRCON website
 */
export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="p-8 text-center">
          {/* STYRCON Brand Icon */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 mb-2">Neoprávnený prístup</h1>
            <p className="text-sm text-slate-600">STYRCON | E-MA SK s.r.o.</p>
          </div>

          {/* Error Message */}
          <div className="mb-8 space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">
              401 - Chránená oblasť
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Nemáte oprávnenie na prístup k tejto stránke. Pre pokračovanie sa prosím prihláste do svojho účtu.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/prihlasenie">
                <LogIn className="mr-2 h-4 w-4" />
                Prihlásiť sa
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Späť na hlavnú stránku
              </Link>
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-500">
              Ak sa problém opakuje, kontaktujte nás na{' '}
              <Link href="/kontakt" className="text-primary hover:underline">
                kontaktnej stránke
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}