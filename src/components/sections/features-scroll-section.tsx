'use client';

import { motion } from 'framer-motion';
import { Flame, Droplets, Thermometer, Shield, Check } from 'lucide-react';
import Image from 'next/image';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  benefits: string[];
  imageUrl?: string;
  videoUrl?: string;
}

const features: Feature[] = [
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
    imageUrl: "https://www.e-ma.sk/imgcache/e-img-499.jpg?v=1632886730"
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
    imageUrl: "https://www.e-ma.sk/imgcache/e-img-449.jpg?v=1632883952"
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
    imageUrl: "https://www.e-ma.sk/imgcache/e-img-369.jpg?v=1632893666"
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
    imageUrl: "https://www.e-ma.sk/imgcache/e-img-297.jpg?v=1632879839"
  }
];

interface FeatureItemProps {
  feature: Feature;
  isReversed: boolean;
}

function FeatureItem({ feature, isReversed }: FeatureItemProps) {
  const Icon = feature.icon;

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={feature.videoUrl} type="video/mp4" />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-16">
            {/* Text Content */}
            <motion.div 
              className={`space-y-6 ${isReversed ? 'lg:order-2' : ''}`}
              initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Icon */}
              <motion.div 
                className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Icon className="w-7 h-7 text-white" />
              </motion.div>

              {/* Title */}
              <motion.h3 
                className="text-3xl lg:text-4xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {feature.title}
              </motion.h3>

              {/* Description */}
              <motion.p 
                className="text-lg lg:text-xl text-white/90 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {feature.description}
              </motion.p>

              {/* Benefits List */}
              <motion.ul 
                className="space-y-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {feature.benefits.map((benefit, benefitIndex) => (
                  <motion.li 
                    key={benefitIndex}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 + (benefitIndex * 0.1) }}
                  >
                    <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-white/90 text-lg">{benefit}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Product Image */}
            <motion.div 
              className={`relative ${isReversed ? 'lg:order-1' : ''}`}
              initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20 relative">
                <Image
                  src={feature.imageUrl || ''}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="text-primary font-semibold text-base sm:text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Prečo STYRCON
            </motion.span>
            
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-3 sm:mt-4 mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Tepelnoizolačné riešenie budúcnosti
            </motion.h2>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Objavte jedinečné vlastnosti STYRCON dosiek, které kombinujú bezpečnosť, efektívnosť a trvalú udržateľnosť.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Full-width video background sections */}
      {features.map((feature, index) => (
        <FeatureItem
          key={index}
          feature={feature}
          isReversed={index % 2 !== 0}
        />
      ))}

    </div>
  );
}