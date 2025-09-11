import { VideoHeader } from '@/components/sections/video-header';
import { FeaturesScrollSection } from '@/components/sections/features-scroll-section';
import { StyrexonInfoSection } from '@/components/sections/styrexon-info-section';
import BrandPartnersGrid from '@/components/sections/brand-partners-grid';
import { SmoothScroll } from '@/components/layout/smooth-scroll';

export default function Home() {
  return (
    <div>
      <SmoothScroll intensity={15} />
      <VideoHeader />
      <FeaturesScrollSection />
      <StyrexonInfoSection />
      <BrandPartnersGrid />
    </div>
  );
}