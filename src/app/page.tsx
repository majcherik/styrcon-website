import { VideoHeader } from '@/components/sections/video-header';
import { SmoothScroll } from '@/components/layout/smooth-scroll';
import LogoCloud from '@/components/logo-cloud';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { LazyFeaturesAccordionSection } from '@/lib/lazy-loading/dynamic-imports';

// Route segment config for optimal performance according to Next.js best practices
export const dynamic = 'force-static' // Force static generation for homepage
export const revalidate = 3600 // 1 hour - homepage content relatively stable
export const preferredRegion = ['fra1', 'ams1'] // European regions for Slovak market
export const maxDuration = 5
export const fetchCache = 'default-cache' // Use default fetch caching behavior

export default function Home() {
  return (
    <div>
      <SmoothScroll intensity={15} />
      <VideoHeader />
      <LogoCloud />
      <LazyFeaturesAccordionSection />
      <ScrollToTop />
    </div>
  );
}