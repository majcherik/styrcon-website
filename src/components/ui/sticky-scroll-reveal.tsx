"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StickyScrollContent {
  title: string;
  description: string;
  content?: React.ReactNode | any;
}

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: StickyScrollContent[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // More responsive active card calculation
  useEffect(() => {
    const updateActiveCard = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, -rect.top / (rect.height - window.innerHeight));
        
        // More gradual transitions - each section takes up more scroll space
        const sectionProgress = scrollProgress * content.length;
        const newActiveCard = Math.min(Math.floor(sectionProgress), content.length - 1);
        
        setActiveCard(Math.max(0, newActiveCard));
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveCard();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    updateActiveCard(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [content.length]);

  return (
    <div
      ref={ref}
      className="min-h-[300vh] relative bg-slate-900" // Much taller container for slower scrolling
    >
      <div className="sticky top-0 flex h-screen overflow-hidden">
        {/* Left side - Text content */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <div className="max-w-lg">
            {content.map((item, index) => (
              <motion.div
                key={item.title + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0,
                  y: activeCard === index ? 0 : 20,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut"
                }}
                className={`${activeCard === index ? 'block' : 'hidden'}`}
              >
                {/* Text container with background for readability */}
                <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                  <motion.h2 
                    className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {item.title}
                  </motion.h2>
                  
                  <motion.p 
                    className="text-lg text-slate-300 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {item.description}
                  </motion.p>
                  
                  {/* Progress indicator */}
                  <div className="flex gap-2 mt-8">
                    {content.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          i === activeCard 
                            ? 'bg-primary w-8' 
                            : 'bg-slate-600 w-4'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right side - Image content */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <div className="relative">
            {content.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0,
                  scale: activeCard === index ? 1 : 0.8,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut"
                }}
                className={`${
                  activeCard === index ? 'block' : 'hidden'
                } relative`}
              >
                <div className={cn(
                  "w-96 h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-700/50",
                  contentClassName
                )}>
                  {item.content}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="lg:hidden">
        <div className="space-y-12 p-6">
          {content.map((item, index) => (
            <div key={index} className="text-center">
              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-slate-700/50">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="w-80 h-80 mx-auto rounded-2xl overflow-hidden shadow-xl border-4 border-slate-700/50">
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};