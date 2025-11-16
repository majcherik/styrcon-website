'use client';

import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Flame, Droplets, Thermometer, Shield, Check } from 'lucide-react';
import Link from 'next/link';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useDebounce } from '@/hooks/use-debounce';
import { useIsClient } from '@/hooks/use-is-client';
import { useScreen } from '@/hooks/use-screen';

// STYRCON features data adapted for accordion
const accordionData = [
  {
    id: 1,
    title: "Trieda A1 - Maximálna požiarna bezpečnosť",
    description: "Nehorľavé tepelnoizolačné dosky najvyššej triedy požiarnej bezpečnosti podľa európskych štandardov EN 13501-1.",
    benefits: [
      "Nehorľavý materiál s triedou A1",
      "Spĺňa najprísnejšie požiarne predpisy",
      "Bezpečnosť pre obytné a komerčné budovy"
    ],
    videoUrl: "https://i.imgur.com/RAJ9PPr.mp4",
    icon: Flame,
  },
  {
    id: 2,
    title: "Paropriepustnosť μ ≤ 3",
    description: "Výnimočná paropriepustnosť umožňuje prirodzené 'dýchanie' budov a predchádza kondenzácii v konštrukcii.",
    benefits: [
      "Prirodzené odvádzanie vlhkosti z konštrukcie",
      "Predchádza vzniku plesní a kondenzácie",
      "Zdravé vnútorné prostredie"
    ],
    videoUrl: "https://i.imgur.com/3X8FpGh.mp4",
    icon: Droplets,
  },
  {
    id: 3,
    title: "Výnimočné tepelnoizolačné vlastnosti",
    description: "Nízka tepelná vodivosť λ = 0,041 W/mK zabezpečuje efektívnu izoláciu a úsporu energií.",
    benefits: [
      "Tepelná vodivosť λ = 0,041 W/mK",
      "Významné úspory nákladov na vykurovanie",
      "Vyšší komfort bývania"
    ],
    videoUrl: "https://i.imgur.com/oneQ8Yj.mp4",
    icon: Thermometer,
  },
  {
    id: 4,
    title: "Pre profesionálne stavebné aplikácie",
    description: "CE certifikované riešenie s komplexným technickým podporou pre architektov, projektantov a stavebné firmy.",
    benefits: [
      "CE certifikácia a európske štandardy",
      "Technické poradenstvo a podpora",
      "Overené tisíckami projektov"
    ],
    videoUrl: "https://i.imgur.com/lYxVBHH.mp4",
    icon: Shield,
  },
];

const HorizontalAccordion = () => {
  // Use state for expanded index to avoid hydration mismatch
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const isClient = useIsClient();
  const screen = useScreen({ debounceDelay: 200 });

  // Detect high-DPI displays for video quality optimization
  // TODO: Use isHighDPI to load higher quality videos on Retina displays
  const isHighDPI = screen && screen.pixelDepth > 24;

  // Log screen info for debugging (can be removed in production)
  React.useEffect(() => {
    if (screen && isHighDPI) {
      console.log('📱 High-DPI display detected:', {
        pixelDepth: screen.pixelDepth,
        width: screen.width,
        height: screen.height,
        orientation: screen.orientation?.type
      });
    }
  }, [screen, isHighDPI]);

  // Load from localStorage after mount (client-side only)
  React.useEffect(() => {
    if (!isClient) return; // SSR-safe guard

    setMounted(true);
    const stored = window.localStorage.getItem('styrcon-accordion-expanded');
    if (stored !== null) {
      try {
        setExpandedIndex(JSON.parse(stored));
      } catch (error) {
        console.log('Error reading localStorage:', error);
      }
    }
  }, [isClient]);

  // Save to localStorage when expandedIndex changes (only after mount)
  React.useEffect(() => {
    if (!mounted || !isClient) return; // SSR-safe guard

    window.localStorage.setItem('styrcon-accordion-expanded', JSON.stringify(expandedIndex));
  }, [expandedIndex, mounted, isClient]);

  // Use intersection observer to optimize video loading
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '50px'
  });

  // Use media query for responsive behavior
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallScreen = useMediaQuery('(max-width: 640px)');

  // Memoize expansion handler for better performance
  const handleExpansion = useCallback((index: number) => {
    setExpandedIndex(index);
  }, []);

  // Memoize responsive class calculation
  const containerClasses = useMemo(() =>
    `w-full ${isSmallScreen ? 'h-[300px]' : isMobile ? 'h-[350px]' : 'h-[380px] md:h-[450px]'}`,
    [isSmallScreen, isMobile]
  );

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={containerClasses}>
      <LayoutGroup>
        <div className="flex w-full h-full gap-2">
          {accordionData.map((item, index) => {
            const isExpanded = index === expandedIndex;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                layout
                initial={false}
                onMouseOver={() => handleExpansion(index)}
                className="relative rounded-xl overflow-hidden cursor-pointer flex-shrink-0"
                animate={{
                  flex: isExpanded ? 3 : 1,
                }}
                transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
              >
                {/* Video Background - only load when visible */}
                {isVisible && (
                  <motion.video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    animate={{
                      scale: isExpanded ? 1 : 1.05,
                      filter: isExpanded
                        ? "brightness(0.9)"
                        : "brightness(0.6)",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <source src={item.videoUrl} type="video/mp4" />
                  </motion.video>
                )}

                <motion.div
                  className="absolute inset-0 flex flex-col justify-end p-5 text-white z-20"
                  layout="position"
                  initial={false}
                >
                  {/* Icon */}
                  <motion.div
                    className="mb-2"
                    layout="position"
                  >
                    <div className="w-8 h-8 bg-primary/30 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <Icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    layout="position"
                    className="font-bold text-white mb-1 drop-shadow-lg"
                    animate={{
                      fontSize: isExpanded
                        ? isSmallScreen ? "1.1rem" : isMobile ? "1.3rem" : "1.5rem"
                        : isSmallScreen ? "0.9rem" : "1.2rem",
                      lineHeight: isExpanded ? 1.3 : 1.4
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.title}
                  </motion.h3>

                  {/* Gradient overlay for expanded state */}
                  {isExpanded && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent w-full z-[-1]" />
                  )}

                  <AnimatePresence mode="wait" initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="details"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                          visible: {
                            transition: {
                              staggerChildren: 0.1,
                              delayChildren: 0.1,
                            },
                          },
                          hidden: {},
                        }}
                        className="relative"
                      >
                        {/* Description */}
                        <motion.p
                          className="text-sm mb-3 drop-shadow-md leading-relaxed"
                          variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { type: "spring", stiffness: 150, damping: 12 }
                            },
                          }}
                        >
                          {item.description}
                        </motion.p>

                        {/* Benefits List */}
                        <motion.ul
                          className="space-y-1 mb-4"
                          variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { type: "spring", stiffness: 150, damping: 12 }
                            },
                          }}
                        >
                          {item.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start text-xs font-medium text-white drop-shadow-lg">
                              <Check className="w-3 h-3 text-primary mt-0.5 mr-2 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </motion.ul>

                        {/* Zistiť viac Button */}
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { type: "spring", stiffness: 150, damping: 12 },
                            },
                          }}
                        >
                          <Link href="/styrcon-produkt">
                            <motion.button
                              className="px-4 py-2 mt-2 rounded bg-white text-black text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Zistiť viac
                            </motion.button>
                          </Link>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </LayoutGroup>
    </div>
  );
};

export function FeaturesAccordionSection() {
  return (
    <div>
      {/* Section Header */}
      <section className="py-8 sm:py-10 lg:py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-start min-h-[25vh]">
          <motion.div
            className="text-left w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              Objavte hlavné výhody STYRCONU
            </motion.h2>
          </motion.div>
        </div>
      </section>

      {/* Horizontal Accordion */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-stone-100/40 via-slate-100/30 to-stone-50/40 relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-orange-200 rounded-full blur-2xl"></div>
          <div className="absolute top-3/4 left-3/4 w-28 h-28 bg-slate-300 rounded-full blur-2xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <HorizontalAccordion />
        </div>
      </section>
    </div>
  );
}