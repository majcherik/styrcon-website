'use client';

import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider';
import { ProgressiveBlur } from '@/components/motion-primitives/progressive-blur';
import Image from 'next/image';
import Link from 'next/link';

// Partner logos data
const partners = [
  {
    id: 1,
    name: 'Styrcon',
    logo: 'https://www.styrcon.sk/Data/2506/UserFiles/images/logo.png',
    url: 'https://www.styrcon.sk/'
  },
  {
    id: 2,
    name: 'Polytex',
    logo: 'https://www.e-ma.sk/design/images/polytex_logo.png',
    url: 'https://www.polytex.sk/'
  }
];

export default function LogoCloud() {
  return (
    <section className="bg-background/95 backdrop-blur-sm py-4 sm:py-6 mt-2">
      <div className="group relative m-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center md:flex-row md:items-center">
          <div className="mb-2 md:mb-0 md:max-w-60 md:border-r md:border-border/30 md:pr-6">
            <p className="text-center md:text-end text-xs sm:text-sm text-muted-foreground font-medium">
              Partneri a značky s ktorými spolupracujeme
            </p>
          </div>
          <div className="relative py-2 md:py-3 md:w-[calc(100%-15rem)]">
            <InfiniteSlider
              speedOnHover={15}
              speed={25}
              gap={100}
              className="h-8 sm:h-10"
            >
              {partners.map((partner) => (
                <div key={partner.id} className="flex items-center justify-center">
                  <Link
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative h-6 w-20 sm:h-8 sm:w-24 md:h-10 md:w-32 cursor-pointer"
                    aria-label={`Visit ${partner.name} website`}
                  >
                    <Image
                      className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      fill
                      sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 128px"
                    />
                  </Link>
                </div>
              ))}
            </InfiniteSlider>

            {/* Gradient fade effects */}
            <div className="absolute inset-y-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>

            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-8 sm:w-12"
              direction="left"
              blurIntensity={0.5}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-8 sm:w-12"
              direction="right"
              blurIntensity={0.5}
            />
          </div>
        </div>
      </div>
    </section>
  );
}