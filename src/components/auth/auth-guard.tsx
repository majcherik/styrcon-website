'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@clerk/nextjs';

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
  const { isLoaded: isAuthLoaded } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Only redirect when auth is ready and no user is found
    if (isAuthLoaded && isUserLoaded && !user) {
      router.push(redirectTo);
    }
  }, [isAuthLoaded, isUserLoaded, user, router, redirectTo]);

  // Show loading state while auth is initializing
  if (!isAuthLoaded || !isUserLoaded) {
    return <>{fallback}</>;
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