import { Hero } from '@/components/sections/hero';
import { FeaturesScrollSection } from '@/components/sections/features-scroll-section';
import { ContactCTA } from '@/components/sections/contact-cta';

export default function Home() {
  return (
    <div className="pt-16">
      <Hero />
      <FeaturesScrollSection />
      <ContactCTA />
    </div>
  );
}