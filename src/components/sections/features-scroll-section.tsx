'use client';

import { motion } from 'framer-motion';
import { Flame, Droplets, Thermometer, Shield, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

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
    <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-16">
      {/* Content */}
      <motion.div 
        className={`space-y-6 ${isReversed ? 'lg:order-2' : ''}`}
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Icon */}
        <motion.div 
          className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Icon className="w-6 h-6 text-primary" />
        </motion.div>

        {/* Title */}
        <motion.h3 
          className="text-2xl lg:text-3xl font-bold text-slate-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {feature.title}
        </motion.h3>

        {/* Description */}
        <motion.p 
          className="text-lg text-slate-600 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {feature.description}
        </motion.p>

        {/* Benefits List */}
        <motion.ul 
          className="space-y-3"
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
              <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-slate-700">{benefit}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Visual Content */}
      <motion.div 
        className={`relative ${isReversed ? 'lg:order-1' : ''}`}
        initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-100 to-slate-200 relative">
          {feature.videoUrl ? (
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={feature.videoUrl} type="video/mp4" />
            </video>
          ) : feature.imageUrl ? (
            <Image
              src={feature.imageUrl}
              alt={feature.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-200">
              <Icon className="w-16 h-16 text-slate-400" />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function FeaturesScrollSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="text-primary font-semibold text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Prečo STYRCON
          </motion.span>
          
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Tepelnoizolačné riešenie budúcnosti
          </motion.h2>
          
          <motion.p 
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Objavte jedinečné vlastnosti STYRCON dosiek, které kombinujú bezpečnosť, efektívnosť a trvalú udržateľnosť.
          </motion.p>
        </motion.div>

        {/* Features */}
        <div className="space-y-24">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              feature={feature}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3 
            className="text-2xl font-bold text-slate-900 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Potrebujete podrobné technické údaje?
          </motion.h3>
          
          <motion.p 
            className="text-slate-600 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Pozrite si kompletné špecifikácie, certifikáty a technické dokumenty.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button asChild size="lg" className="px-8 py-4 text-lg">
              <Link href="/styrcon-produkt">
                Zobraziť technické údaje
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}