'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { logger, sanitizeErrorForClient } from '@/lib/logging/logger';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error with context using our logger
    logger.error('Application error boundary triggered', {
      digest: error.digest,
      url: window.location.href,
      userAgent: navigator.userAgent
    }, error);
  }, [error]);

  const sanitizedError = sanitizeErrorForClient(error);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Nastala chyba
          </h1>

          <p className="text-slate-600 mb-6">
            Ľutujeme, ale nastala neočakávaná chyba. Skúste obnoviť stránku alebo sa vráťte na hlavnú stránku.
          </p>

          {process.env.NODE_ENV === 'development' && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-left">
              <p className="text-xs text-red-800 font-mono break-words">
                {error.message}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Button
            onClick={reset}
            className="w-full"
            size="lg"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Skúsiť znova
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full"
            size="lg"
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Hlavná stránka
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}