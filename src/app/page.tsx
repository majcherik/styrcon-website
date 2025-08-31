import { VideoHeader } from '@/components/sections/video-header';
import { FeaturesScrollSection } from '@/components/sections/features-scroll-section';
import { ProjectGallerySimple } from '@/components/sections/project-gallery-simple';
import { BeforeAfterSection } from '@/components/sections/before-after';
import { ContactCTA } from '@/components/sections/contact-cta';
import { SmoothScroll } from '@/components/layout/smooth-scroll';

export default function Home() {
  return (
    <div>
      <SmoothScroll intensity={15} />
      <VideoHeader />
      <FeaturesScrollSection />
      <ProjectGallerySimple />
      <BeforeAfterSection />
      <ContactCTA />
    </div>
  );
}