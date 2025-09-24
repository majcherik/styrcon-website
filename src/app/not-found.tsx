'use client'

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search, Loader2 } from 'lucide-react';
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { AuthWrapper } from '@/components/auth/auth-wrapper';

export default function NotFound() {
  return (
    <AuthWrapper requireAuth={false}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
        {/* 404 Graphic */}
        <div className="mb-8">
          <div className="text-[120px] font-bold text-slate-200 leading-none select-none">
            404
          </div>
          <div className="relative -mt-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
              <Search className="w-8 h-8 text-primary/60" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-3">
            Stránka nebola nájdená
          </h1>
          <p className="text-slate-600 leading-relaxed whitespace-normal">
            Ľutujeme, ale stránka ktorú hľadáte neexistuje alebo bola presunutá.
            Skontrolujte prosím URL adresu alebo sa vráťte na hlavnú stránku.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/" className="flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              Hlavná stránka
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="w-full">
            <Link href="/styrcon-produkt" className="flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Späť na produkt
            </Link>
          </Button>
        </div>

        {/* Authentication State & Additional Help */}
        <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
          <ClerkLoading>
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
              <span className="text-sm text-slate-500">Načítavam autentifikáciu...</span>
            </div>
          </ClerkLoading>

          <ClerkLoaded>
            <div>
              <p className="text-sm text-slate-500 mb-3">
                Potrebujete pomoc?
              </p>
              <Link
                href="/kontakt"
                className="text-sm text-primary hover:underline font-medium"
              >
                Kontaktujte nás
              </Link>
            </div>
          </ClerkLoaded>
        </div>

        {/* Popular Pages */}
        <div className="mt-8">
          <p className="text-sm text-slate-600 mb-4">Populárne stránky:</p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <Link href="/styrcon-produkt" className="text-primary hover:underline">
              STYRCON produkt
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/galeria" className="text-primary hover:underline">
              Galéria
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/aktuality" className="text-primary hover:underline">
              Aktuality
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/kontakt" className="text-primary hover:underline">
              Kontakt
            </Link>
          </div>
        </div>
        </div>
      </div>
    </AuthWrapper>
  );
}