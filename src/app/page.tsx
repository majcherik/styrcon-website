import { Hero } from '@/components/sections/hero';
import { ProductOverview } from '@/components/sections/product-overview';
import { ContactCTA } from '@/components/sections/contact-cta';
import BeamsBackground from '@/components/ui/beams-background';

export default function Home() {
  return (
    <BeamsBackground intensity="subtle">
      <div className="pt-16">
        <Hero />
        <ProductOverview />
        <ContactCTA />
      </div>
    </BeamsBackground>
  );
}