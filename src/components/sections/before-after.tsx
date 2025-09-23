'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

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
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden select-none rounded-xl" ref={containerRef}>
      {/* Before Image */}
      <div className="absolute inset-0">
        <img 
          src={beforeImage} 
          alt="Before" 
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" 
        />
        {/* Before Label */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-semibold shadow-lg">
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
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-green-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-semibold shadow-lg">
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-slate-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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

export function BeforeAfterSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Pred a Po
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Pozrite si aplikáciu Styrconu. Posuňte posúvač pre porovnanie.
          </motion.p>
        </motion.div>

        {/* Before/After Slider */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <BeforeAfterSlider
            beforeImage="https://www.e-ma.sk/imgcache/e-img-565.jpg?v=1727402827"
            afterImage="https://www.e-ma.sk/imgcache/e-img-576.jpg?v=1727877198"
          />
        </motion.div>

        {/* Instructions */}
        <motion.div 
          className="text-center mt-6 sm:mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-sm sm:text-base text-slate-500">
            Potiahnutím posúvača môžete vidieť finálny výsledok
          </p>
        </motion.div>
      </div>
    </section>
  );
}