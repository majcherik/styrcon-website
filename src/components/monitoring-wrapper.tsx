'use client'

import dynamic from 'next/dynamic';

// Dynamically import all monitoring components with ssr: false
const GoogleAnalytics = dynamic(
  () => import('@/components/analytics/google-analytics').then(mod => ({ default: mod.GoogleAnalytics })),
  { ssr: false }
);

const WebVitalsTracker = dynamic(
  () => import('@/components/analytics/web-vitals').then(mod => ({ default: mod.WebVitalsTracker })),
  { ssr: false }
);

const StyrconWebVitals = dynamic(
  () => import('@/components/analytics/styrcon-web-vitals').then(mod => ({ default: mod.StyrconWebVitals })),
  { ssr: false }
);

const ServiceWorkerRegistration = dynamic(
  () => import('@/components/pwa/service-worker').then(mod => ({ default: mod.ServiceWorkerRegistration })),
  { ssr: false }
);

const CookieConsent = dynamic(
  () => import('@/components/ui/cookie-consent').then(mod => ({ default: mod.CookieConsent })),
  { ssr: false }
);

export function MonitoringWrapper() {
  return (
    <>
      {/* Analytics, Performance and PWA monitoring */}
      <GoogleAnalytics />
      <WebVitalsTracker />
      <StyrconWebVitals />
      <ServiceWorkerRegistration />

      {/* Cookie Consent Banner */}
      <CookieConsent />
    </>
  );
}
