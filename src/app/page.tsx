import { VideoHeader } from '@/components/sections/video-header';
import { FeaturesScrollSection } from '@/components/sections/features-scroll-section';
import { ProjectGallerySimple } from '@/components/sections/project-gallery-simple';
import { BeforeAfterSection } from '@/components/sections/before-after';
import { ContactCTA } from '@/components/sections/contact-cta';

export default function Home() {
  return (
    <div>
      <VideoHeader />
      <FeaturesScrollSection />
      <ProjectGallerySimple />
      <BeforeAfterSection />
      <ContactCTA />
    </div>
  );
}