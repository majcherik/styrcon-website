import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlassmorphicNavbar } from "@/components/navigation/glassmorphic-navbar";
import { Footer } from "@/components/layout/footer";
import { StructuredData } from "@/components/structured-data";
import { organizationStructuredData, websiteStructuredData } from "@/lib/structured-data";
import { AuthProvider } from "@/contexts/auth-context";
import { Providers } from "@/components/providers/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "STYRCON - Paropriepustné tepelnoizolačné dosky | E-MA SK s.r.o.",
  description: "STYRCON nehorľavé paropriepustné tepelnoizolačné dosky triedy A1. Profesionálne riešenia pre zateplenie budov. Kontaktujte E-MA SK s.r.o.",
  keywords: "styrcon, paropriepustné dosky, tepelná izolácia, nehorľavá izolácia, zateplenie budov, sanačné zateplenie",
  authors: [{ name: "E-MA SK s.r.o." }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "STYRCON - E-MA SK s.r.o.",
    title: "STYRCON - Paropriepustné tepelnoizolačné dosky",
    description: "Nehorľavé paropriepustné tepelnoizolačné dosky triedy A1 pre profesionálne zateplenie budov.",
  },
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
    <html lang="sk" className={inter.variable} suppressHydrationWarning={true}>
      <head>
        <StructuredData data={organizationStructuredData} />
        <StructuredData data={websiteStructuredData} />
      </head>
      <body className="antialiased">
        <Providers>
          <AuthProvider>
            <GlassmorphicNavbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
