import { Hero } from '@/components/sections/hero';
import { ProductOverview } from '@/components/sections/product-overview';
import { ContactCTA } from '@/components/sections/contact-cta';

export default function Home() {
  return (
    <div className="pt-16">
      <Hero />
      <ProductOverview />
      <ContactCTA />
    </div>
  );
}