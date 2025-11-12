'use client'

import dynamic from 'next/dynamic';

// Dynamic import for Service Worker to prevent SSR issues
const ServiceWorkerRegistration = dynamic(
  () => import('@/components/pwa/service-worker').then(mod => ({ default: mod.ServiceWorkerRegistration })),
  { ssr: false }
);

export function ServiceWorkerWrapper() {
  return <ServiceWorkerRegistration />;
}
