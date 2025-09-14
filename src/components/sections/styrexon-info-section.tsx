'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Building2, Shield, Thermometer } from 'lucide-react';
import { StyrexonSystemCarousel } from './styrexon-system-carousel';

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

function BeforeAfterSlider({ beforeImage, afterImage, beforeLabel = "PRED", afterLabel = "PO" }: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const handle = handleRef.current;

    if (!container || !handle) return;

    const onMouseDown = () => {
      setIsDragging(true);
    };

    const onTouchStart = () => {
      setIsDragging(true);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const containerRect = container.getBoundingClientRect();
      const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      setPosition(Math.max(0, Math.min(100, newPosition)));
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      
      const containerRect = container.getBoundingClientRect();
      const touch = e.touches[0];
      const newPosition = ((touch.clientX - containerRect.left) / containerRect.width) * 100;
      setPosition(Math.max(0, Math.min(100, newPosition)));
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    const onTouchEnd = () => {
      setIsDragging(false);
    };

    // Mouse events
    handle.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    
    // Touch events
    handle.addEventListener('touchstart', onTouchStart, { passive: false });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      handle.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      handle.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging]);

  return (
    <div className="relative w-full h-[40vh] overflow-hidden select-none rounded-xl" ref={containerRef}>
      {/* Before Image */}
      <div className="absolute inset-0">
        <img 
          src={beforeImage} 
          alt="Before" 
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" 
        />
        {/* Before Label */}
        <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
          {beforeLabel}
        </div>
      </div>
      
      {/* After Image */}
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img 
          src={afterImage} 
          alt="After" 
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" 
        />
        {/* After Label */}
        <div className="absolute top-3 right-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
          {afterLabel}
        </div>
      </div>
      
      {/* Slider Handle */}
      <div
        ref={handleRef}
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize touch-action-none z-10 shadow-lg"
        style={{ left: `${position}%` }}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-slate-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-600"
          >
            <path d="m9 18 6-6-6-6" />
            <path d="m15 18 6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function StyrexonInfoSection() {
  const benefits = [
    {
      icon: Shield,
      title: "Nehorľavé a bezpečné",
      description: "Zachováva všetky prednosti tepelnej izolácie STYRCON 200® s triedou nehorľavosti A2"
    },
    {
      icon: Thermometer,
      title: "Paropriepustné",
      description: "Dôraz na zachovanie paropriepustnosti pre zdravé vnútorné prostredie"
    },
    {
      icon: Building2,
      title: "Univerzálne použitie",
      description: "Vhodné na novostavby i starších budovy, sanáciu histórie budov aj interiérov"
    },
    {
      icon: CheckCircle,
      title: "Rezistentné voči bio-invázii",
      description: "Nevytvárajú sa riasy a plesne, myši si nerobia chodbičky, vtáci nehniezdia"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="bg-slate-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
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
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">
                          {benefit.title}
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* STYREXON System Components Carousel */}
        <StyrexonSystemCarousel />

        {/* Additional Applications */}
        <motion.div 
          className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6 text-center">
            Oblasti použitia
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h4 className="font-semibold text-slate-900 mb-2">Novostavby</h4>
              <p className="text-slate-600 text-sm">
                Zlepšenie tepelnoizolačných schopností obvodového muriva
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h4 className="font-semibold text-slate-900 mb-2">Sanácia</h4>
              <p className="text-slate-600 text-sm">
                Starých budov, hlinených/valkových/kamenných domov
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <h4 className="font-semibold text-slate-900 mb-2">Historické pamiatky</h4>
              <p className="text-slate-600 text-sm">
                Sakrálne budovy, interiéry kde nie je možný zásah na fasáde
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Before/After Section */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="text-center mb-8">
            <motion.h3 
              className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Pred a Po
            </motion.h3>
            
            <motion.p 
              className="text-base text-slate-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Pozrite si transformáciu budovy s STYRCON tepelnou izoláciou
            </motion.p>
          </div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <BeforeAfterSlider
              beforeImage="https://www.e-ma.sk/imgcache/e-img-565.jpg?v=1727402827"
              afterImage="https://www.e-ma.sk/imgcache/e-img-576.jpg?v=1727877198"
            />
          </motion.div>

          <motion.div 
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <p className="text-sm text-slate-500">
              Potiahnutím posúvača porovnajte stav pred a po aplikácii STYRCON izolácie
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}