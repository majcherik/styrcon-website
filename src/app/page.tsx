import { VideoHeader } from '@/components/sections/video-header';
import { FeaturesAccordionSection } from '@/components/sections/features-accordion-section';
import { StyrexonInfoSection } from '@/components/sections/styrexon-info-section';
import { SmoothScroll } from '@/components/layout/smooth-scroll';
import LogoCloud from '@/components/logo-cloud';

export default function Home() {
  return (
    <div>
      <SmoothScroll intensity={15} />
      <VideoHeader />
      <LogoCloud />
      <StyrexonInfoSection />
      <FeaturesAccordionSection />
    </div>
  );
}