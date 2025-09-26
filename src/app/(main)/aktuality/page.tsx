import type { Metadata } from 'next';
import { AktualityClient } from './aktuality-client';
import { getNewsArticles } from '@/lib/cache/strategies';

export const metadata: Metadata = {
  title: 'STYRCON Blog - Technické články a praktické rady | E-MA SK',
  description: 'Objavte najnovšie technické články, praktické rady a odborné informácie o STYRCON zatepľovaní a sanácii budov.',
  keywords: 'styrcon blog, technické články, zatepľovanie, sanácia budov, vlhké stavby, paropriepustnosť',
};

// Route segment config for optimal performance according to Next.js best practices
export const dynamic = 'force-static' // Force static generation for better performance
export const revalidate = 3600 // 1 hour - blog content updates moderately
export const preferredRegion = ['fra1', 'ams1'] // European regions for Slovak market
export const maxDuration = 5
export const fetchCache = 'default-cache' // Use default fetch caching behavior

export default async function AktualityPage() {
  // Fetch news articles with ISR (data available for future use)
  // const newsData = await getNewsArticles(10);

  return <AktualityClient />;
}