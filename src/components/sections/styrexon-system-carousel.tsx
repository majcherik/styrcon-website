"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface SystemComponent {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

const systemComponents: SystemComponent[] = [
  {
    id: 1,
    name: "STYRCON 200®",
    description: "polystyrén-cementová tepelno-izolačná kompozitná doska",
    imageUrl: "https://www.e-ma.sk/imgcache/styrcon-200-e-img-159-5-800-600-0-ffffff.jpg?v=1632745931"
  },
  {
    id: 2,
    name: "LEPSTYR (25kg)",
    description: "lepiaca armovacia stierka na Styrcon",
    imageUrl: "https://www.e-ma.sk/imgcache/lepstyr-25kg-e-img-160-5-800-600-0-ffffff.jpg?v=1632745933"
  },
  {
    id: 3,
    name: "PENESTYR (5kg/1kg)",
    description: "penetračný náter pre zatepľovací systém Styrexon",
    imageUrl: "https://www.e-ma.sk/imgcache/penestyr-5kg1kg-e-img-162-5-800-600-0-ffffff.jpg?v=1632745939"
  },
  {
    id: 4,
    name: "TANIEROVÁ HMOŽDINKA",
    description: "hmoždinka na kotvenie dosiek Styrcon",
    imageUrl: "https://www.e-ma.sk/imgcache/tanierova-hmozdinka-e-img-161-5-800-600-0-ffffff.jpg?v=1632745932"
  },
  {
    id: 5,
    name: "SKLOKERAMICKÁ MRIEŽKA",
    description: "sklotextilná sieťka na armovanie zatepľovacieho systému",
    imageUrl: "https://www.e-ma.sk/imgcache/sklokeramicka-mriezka-e-img-163-5-800-600-0-ffffff.jpg?v=1632745949"
  }
];

export function StyrexonSystemCarousel() {
  return (
    <motion.div
      className="mt-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="text-center mb-12">
        <motion.h3 
          className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          STYREXON systém sa skladá z
        </motion.h3>
        
        <motion.p 
          className="text-base text-slate-600 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Jednotlivé komponenty sú zosúladené tak, aby vytvárali jeden harmonický celok
        </motion.p>
      </div>

      <motion.div
        className="max-w-5xl mx-auto px-4"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {systemComponents.map((component, index) => (
              <CarouselItem key={component.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <motion.div 
                  className="p-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
                    <CardContent className="flex flex-col items-center p-6">
                      <div className="w-full h-48 mb-4 bg-slate-50 rounded-lg overflow-hidden flex items-center justify-center">
                        <img 
                          src={component.imageUrl} 
                          alt={component.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      
                      <div className="text-center">
                        <h4 className="text-lg font-bold text-slate-900 mb-2">
                          {component.name}
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {component.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </motion.div>
    </motion.div>
  );
}