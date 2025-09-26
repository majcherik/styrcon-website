import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { ShadcnNavbar } from "@/components/navigation/shadcn-navbar";
import { Footer } from "@/components/layout/footer";
import { StructuredData } from "@/components/structured-data";
import { localBusinessStructuredData, websiteStructuredData } from "@/lib/structured-data";
import { Providers } from "@/components/providers/providers";
import { AuthErrorBoundary } from "@/components/auth/auth-error-boundary";
import { GlobalErrorBoundary } from "@/components/error/global-error-boundary";
import { WebVitalsTracker } from "@/components/analytics/web-vitals";
import { StyrconWebVitals } from "@/components/analytics/styrcon-web-vitals";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { ServiceWorkerRegistration } from "@/components/pwa/service-worker";
import {
  inter,
  roboto,
  sourceSans3,
  openSans,
  fontLoadingOptimization
} from "@/lib/fonts/slovak-typography";
import { debugClerkInitialization } from "@/lib/clerk/clerk-validation";
import { ClerkDebugComponent } from "@/components/debug/clerk-debug-component";
import { ClerkConnectionTest } from "@/components/test/clerk-connection-test";

export const metadata: Metadata = {
  title: {
    default: "STYRCON - Paropriepustné tepelnoizolačné dosky | E-MA SK s.r.o.",
    template: "%s | STYRCON - E-MA SK s.r.o."
  },
  description: "STYRCON nehorľavé paropriepustné tepelnoizolačné dosky triedy A1. Profesionálne riešenia pre zateplenie budov na Slovensku. Kontaktujte E-MA SK s.r.o.",
  keywords: [
    "styrcon",
    "paropriepustné dosky",
    "tepelná izolácia",
    "nehorľavá izolácia",
    "zateplenie budov",
    "sanačné zateplenie",
    "tepelna izolacia",
    "nehorlava izolacia",
    "budovy",
    "úspora tepla",
    "rekonštrukcia",
    "obklad",
    "lacné zateplenie",
    "polystyrén",
    "vlna",
    "murivo",
    "sanácia",
    "polytex",
    "bývanie",
    "byty",
    "domy",
    "nehnuteľnosti",
    "domov",
    "vykurovanie",
    "Jelenec",
    "Slovensko",
    "Slovakia",
    "isolation",
    "heating"
  ],
  authors: [{ name: "E-MA SK s.r.o.", url: "https://www.e-ma-sk.com" }],
  creator: "E-MA SK s.r.o.",
  publisher: "E-MA SK s.r.o.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "STYRCON - E-MA SK s.r.o.",
    title: "STYRCON - Paropriepustné tepelnoizolačné dosky",
    description: "Nehorľavé paropriepustné tepelnoizolačné dosky triedy A1 pre profesionálne zateplenie budov na Slovensku.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "STYRCON tepelnoizolačné dosky - E-MA SK s.r.o.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "STYRCON - Paropriepustné tepelnoizolačné dosky",
    description: "Nehorľavé paropriepustné tepelnoizolačné dosky triedy A1 pre profesionálne zateplenie budov.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
    languages: {
      'sk-SK': process.env.NEXT_PUBLIC_SITE_URL,
      'x-default': process.env.NEXT_PUBLIC_SITE_URL,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  category: 'Building Materials',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="sk"
        className={`${inter.variable} ${roboto.variable} ${sourceSans3.variable} ${openSans.variable}`}
        suppressHydrationWarning={true}
      >
        <head>
          <StructuredData data={localBusinessStructuredData} />
          <StructuredData data={websiteStructuredData} />

          {/* Next.js optimized fonts handle their own preloading */}

          {/* Enhanced typography CSS variables */}
          <style dangerouslySetInnerHTML={{
            __html: `
              :root {
                --font-primary: ${inter.style.fontFamily}, system-ui, -apple-system, sans-serif;
                --font-business: ${roboto.style.fontFamily}, var(--font-primary);
                --font-headings: ${sourceSans3.style.fontFamily}, var(--font-primary);
                --font-technical: ${openSans.style.fontFamily}, var(--font-primary);
              }
              body {
                font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
                font-variant-ligatures: common-ligatures contextual;
                text-rendering: optimizeLegibility;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              h1, h2, h3, h4, h5, h6 {
                font-family: var(--font-headings);
                font-feature-settings: "kern" 1, "liga" 1;
                letter-spacing: -0.0125em;
              }
            `
          }} />
        </head>
        <body className="antialiased font-primary">
          <Providers>
            <GlobalErrorBoundary>
              <AuthErrorBoundary>
                <ShadcnNavbar />
                <main className="min-h-screen">
                  {children}
                </main>
                <Footer />
              </AuthErrorBoundary>
            </GlobalErrorBoundary>
          </Providers>

          {/* Analytics, Performance and PWA monitoring */}
          <GoogleAnalytics />
          <WebVitalsTracker />
          <StyrconWebVitals />
          <ServiceWorkerRegistration />

          {/* Development debugging */}
          <ClerkDebugComponent />
          <ClerkConnectionTest />
        </body>
      </html>
    </ClerkProvider>
  );
}
