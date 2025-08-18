import { Hero } from '@/components/sections/hero';
import { ProductOverview } from '@/components/sections/product-overview';
import { ContactCTA } from '@/components/sections/contact-cta';
import { Newsletter } from '@/components/sections/newsletter';
import { HeroUITest } from '@/components/test/heroui-test';

export default function Home() {
  return (
    <div className="pt-16">
      {/* HeroUI Test Section - TEMPORARY */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroUITest />
        </div>
      </section>
      
      <Hero />
      <ProductOverview />
      <ContactCTA />
      <Newsletter />
    </div>
  );
}