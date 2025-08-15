'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export function AuthGuard({ 
  children, 
  fallback = <AuthLoadingFallback />, 
  redirectTo = '/prihlasenie' 
}: AuthGuardProps) {
  const { user, isLoading, isAuthReady, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect when auth is ready and no user is found
    if (isAuthReady && !user && !error) {
      router.push(redirectTo);
    }
  }, [isAuthReady, user, error, router, redirectTo]);

  // Show loading state while auth is initializing
  if (!isAuthReady || isLoading) {
    return <>{fallback}</>;
  }

  // Show error state if auth failed
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Chyba pri prihlásení</h1>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Skúsiť znova
          </button>
        </div>
      </div>
    );
  }

  // Render children only if user is authenticated
  if (user) {
    return <>{children}</>;
  }

  // This should not happen due to the redirect above, but just in case
  return <>{fallback}</>;
}

function AuthLoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-slate-600">Overuje sa prihlásenie...</p>
      </div>
    </div>
  );
}