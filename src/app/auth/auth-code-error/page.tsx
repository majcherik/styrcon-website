import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Chyba pri potvrdení</h1>
          <p className="text-slate-600 mb-6">
            Nastala chyba pri potvrdení vašej emailovej adresy. Odkaz môže byť neplatný alebo expirovaný.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/prihlasenie">Skúsiť prihlásenie</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/registracia">Nová registrácia</Link>
            </Button>
            <Button asChild variant="ghost" className="w-full">
              <Link href="/">Návrat na hlavnú stránku</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}