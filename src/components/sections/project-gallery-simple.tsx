'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { LampContainer } from '@/components/ui/lamp';

const projects = [
  {
    id: 1,
    image: 'https://www.e-ma.sk/imgcache/e-news-79.jpg?v=1632745952',
    title: 'STYRCON Projekt 1',
    description: 'Moderné zateplenie rodinného domu'
  },
  {
    id: 2,
    image: 'https://www.e-ma.sk/imgcache/e-img-205.jpg?v=1632875339',
    title: 'STYRCON Projekt 2', 
    description: 'Rekonštrukcia bytového domu'
  },
  {
    id: 3,
    image: 'https://www.e-ma.sk/imgcache/e-img-337.jpg?v=1632880746',
    title: 'STYRCON Projekt 3',
    description: 'Komerčná budova s STYRCON izoláciou'
  },
  {
    id: 4,
    image: 'https://www.e-ma.sk/imgcache/e-img-442.jpg?v=1632882122',
    title: 'STYRCON Projekt 4',
    description: 'Historická budova - sanačné riešenie'
  },
  {
    id: 5,
    image: 'https://www.e-ma.sk/imgcache/e-img-301.jpg?v=1632870509',
    title: 'STYRCON Projekt 5',
    description: 'Priemyselný objekt'
  }
];

export function ProjectGallerySimple() {
  return (
    <section className="bg-slate-900">
      {/* Lamp Effect Header */}
      <div className="relative">
        <LampContainer className="py-12 sm:py-16">
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            Naše Projekty
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="text-slate-300 text-center text-lg md:text-xl max-w-2xl mx-auto mt-4"
          >
            Preskúmajte naše realizované projekty s STYRCON riešeniami
          </motion.p>
        </LampContainer>
      </div>

      {/* Project Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">

        {/* Horizontal Scrollable Gallery */}
        <div className="relative">
          <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="flex-shrink-0 w-80 sm:w-96"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-slate-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                      sizes="(max-width: 640px) 320px, 384px"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 text-sm">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-8">
          <p className="text-sm sm:text-base text-slate-400">
            Posúvajte horizontálne pre prehľad všetkých projektov
          </p>
        </div>
      </div>
      
      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}