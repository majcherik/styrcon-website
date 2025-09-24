'use client';

import { motion } from 'framer-motion';
import { Shield, Building2, Thermometer, CheckCircle } from 'lucide-react';
import { StyrexonSystemCarousel } from './styrexon-system-carousel';
import { GridBeams } from '@/components/magicui/grid-beams';

export function StyrexonSystemInfo() {
  const benefits = [
    {
      icon: Shield,
      title: "Nehorľavé a bezpečné",
      description: "Zachováva všetky prednosti tepelnej izolácie STYRCON 200® s triedou nehorľavosti A1"
    },
    {
      icon: Thermometer,
      title: "Paropriepustné",
      description: "Dôraz na zachovanie paropriepustnosti pre zdravé vnútorné prostredie"
    },
    {
      icon: Building2,
      title: "Univerzálne použitie",
      description: "Vhodné na novostavby a staršie budovy, sanáciu historických budov a interiérov"
    },
    {
      icon: CheckCircle,
      title: "Rezistentné voči bio-invázii",
      description: "Nevytvárajú sa riasy a plesne, myši si nerobia chodbičky, vtáci nehniezdia"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-stone-50 via-slate-50 to-stone-100 relative overflow-hidden">
      {/* Subtle decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-slate-200 rounded-full blur-2xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
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
            STYRCON 200®
          </motion.span>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            STYREXON Zatepľovací Systém
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            E-MA SK s.r.o je obchodným a exportným partnerom výrobcu Styrcon s.r.o.
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left Column - Main Description */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="prose prose-lg prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed">
                <strong>STYREXON</strong> je vonkajší tepelno izolačný kompozitný systém (ETICS).
                Jednotlivé komponenty sú zosúladené tak, aby vytvárali jeden harmonický celok.
              </p>

              <p className="text-slate-700 leading-relaxed">
                STYREXON je kontaktný zatepľovací systém. Izolačné dosky STYRCON 200® sa kontaktne
                lepia o podklad a kotvia plastovými hmoždinkami. Po zabrúsení a napenetrovaní sa povrch
                dosiek vystuží sklotextilnou sieťkou vnorenou do stierky a na povrch sa kontaktne
                nanesie vhodná omietka.
              </p>

              <p className="text-slate-700 leading-relaxed">
                Spoločnosť STYRCON vyrába na Slovensku tepelnú izoláciu vlastnou originálnou
                patentovo chránenou technológiou už od roku <strong>1991</strong>. Polystyrén-cementové
                dosky STYRCON sú paropriepustné, nehorľavé, vhodné tiež na zateplenie problémových
                stavieb a neštandardných konštrukcií.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Key Features */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GridBeams
              gridSize={20}
              gridColor="rgba(59, 130, 246, 0.15)"
              rayCount={15}
              rayOpacity={0.4}
              raySpeed={1.2}
              rayLength="30vh"
              gridFadeStart={10}
              gridFadeEnd={85}
              className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-800"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Kľúčové vlastnosti STYREXON
                </h3>

                <div className="space-y-4">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <motion.div
                        key={index}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-blue-300" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">
                            {benefit.title}
                          </h4>
                          <p className="text-slate-300 text-sm leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </GridBeams>
          </motion.div>
        </div>

        {/* STYREXON System Components Carousel */}
        <StyrexonSystemCarousel />
      </div>
    </section>
  );
}