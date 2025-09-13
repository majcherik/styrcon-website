'use client';

import { motion } from 'framer-motion';
import { Flame, Droplets, Thermometer, Shield, Check } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  benefits: string[];
  imageUrl?: string;
  videoUrl?: string;
}

const features = [
  {
    icon: Flame,
    title: "Trieda A1 - Maximálna požiarna bezpečnosť",
    description: "Nehorľavé tepelnoizolačné dosky najvyššej triedy požiarnej bezpečnosti podľa európskych štandardov EN 13501-1.",
    benefits: [
      "Nehorľavý materiál s triedou A1",
      "Spĺňa najprísnejšie požiarne predpisy",
      "Bezpečnosť pre obytné a komerčné budovy"
    ],
    videoUrl: "https://i.imgur.com/RAJ9PPr.mp4",
    imageUrl: "https://www.e-ma.sk/imgcache/e-img-499.jpg?v=1632886730",
    className: "col-span-1 lg:col-span-3 border-b lg:border-r dark:border-neutral-800"
  },
  {
    icon: Droplets,
    title: "Paropriepustnosť μ ≤ 3",
    description: "Výnimočná paropriepustnosť umožňuje prirodzené \"dýchanie\" budov a predchádza kondenzácii v konštrukcii.",
    benefits: [
      "Prirodzené odvádzanie vlhkosti z konštrukcie",
      "Predchádza vzniku plesní a kondenzácie",
      "Zdravé vnútorné prostredie"
    ],
    videoUrl: "https://i.imgur.com/3X8FpGh.mp4",
    imageUrl: "https://www.e-ma.sk/imgcache/e-img-449.jpg?v=1632883952",
    className: "col-span-1 lg:col-span-3 border-b dark:border-neutral-800"
  },
  {
    icon: Thermometer,
    title: "Výnimočné tepelnoizolačné vlastnosti",
    description: "Nízka tepelná vodivosť λ = 0,041 W/mK zabezpečuje efektívnu izoláciu a úsporu energií.",
    benefits: [
      "Tepelná vodivosť λ = 0,041 W/mK",
      "Významné úspory nákladov na vykurovanie",
      "Vyšší komfort bývania"
    ],
    videoUrl: "https://i.imgur.com/oneQ8Yj.mp4",
    imageUrl: "https://www.e-ma.sk/imgcache/e-img-369.jpg?v=1632893666",
    className: "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800"
  },
  {
    icon: Shield,
    title: "Pre profesionálne stavebné aplikácie",
    description: "CE certifikované riešenie s komplexným technickým podporou pre architektov, projektantov a stavebné firmy.",
    benefits: [
      "CE certifikácia a európske štandardy",
      "Technické poradenstvo a podpora",
      "Overené tisíckami projektov"
    ],
    videoUrl: "https://i.imgur.com/lYxVBHH.mp4",
    imageUrl: "https://www.e-ma.sk/imgcache/e-img-297.jpg?v=1632879839",
    className: "col-span-1 lg:col-span-3"
  }
];

// Simple Aceternity-style Bento Components
const FeatureCard = ({ children, className }: { children: React.ReactNode; className: string }) => {
  return (
    <div className={cn(`p-5 relative overflow-hidden min-h-[350px]`, className)}>
      {children}
    </div>
  );
};

function BentoFeature({ feature, className }: { feature: any; className: string }) {
  const Icon = feature.icon;
  
  return (
    <FeatureCard className={className}>
      {/* Video Background */}
      {feature.videoUrl && (
        <div className="absolute inset-0 opacity-60 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={feature.videoUrl} type="video/mp4" />
          </video>
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Icon */}
        <div className="mb-4">
          <div className="w-10 h-10 bg-primary/30 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2 drop-shadow-lg">
          {feature.title}
        </h3>
        
        {/* Description */}
        <p className="text-base font-medium text-white mb-4 drop-shadow-md flex-1">
          {feature.description}
        </p>
        
        {/* Benefits */}
        <ul className="space-y-1 mt-auto">
          {feature.benefits.map((benefit: string, idx: number) => (
            <li key={idx} className="flex items-start text-sm font-medium text-white drop-shadow-lg">
              <Check className="w-3 h-3 text-primary mt-1 mr-2 flex-shrink-0" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute bottom-0 z-5 inset-x-0 h-32 bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute top-0 z-5 inset-x-0 h-20 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />
    </FeatureCard>
  );
}

export function FeaturesScrollSection() {
  return (
    <div>
      {/* Section Header */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
          >
            <motion.span 
              className="text-primary font-semibold text-base sm:text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Prečo STYRCON
            </motion.span>
            
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-3 sm:mt-4 mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              Tepelnoizolačné riešenie budúcnosti
            </motion.h2>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Objavte jedinečné vlastnosti STYRCON dosiek, které kombinujú bezpečnosť, efektívnosť a trvalú udržateľnosť.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Cards - Simple 2x2 Grid */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-6 xl:border rounded-md dark:border-neutral-800">
            {features.map((feature) => (
              <BentoFeature
                key={feature.title}
                feature={feature}
                className={feature.className}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}