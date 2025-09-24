'use client';

import { motion } from 'framer-motion';

export function ApplicationAreas() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-gradient-to-r from-blue-50/80 to-orange-50/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-white/50 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6 text-center">
            Oblasti použitia
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/60"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="font-semibold text-slate-900 mb-2">Novostavby</h4>
              <p className="text-slate-600 text-sm">
                Zlepšenie tepelnoizolačných schopností obvodového muriva
              </p>
            </motion.div>

            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/60"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="font-semibold text-slate-900 mb-2">Sanácia</h4>
              <p className="text-slate-600 text-sm">
                Starých budov, hlinených/valkových/kamenných domov
              </p>
            </motion.div>

            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/60"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="font-semibold text-slate-900 mb-2">Historické pamiatky</h4>
              <p className="text-slate-600 text-sm">
                Sakrálne budovy, interiéry kde nie je možný zásah na fasáde
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}