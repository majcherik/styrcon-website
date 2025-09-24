'use client';

import { motion } from 'framer-motion';
import { BeforeAfterSlider } from '@/components/ui/before-after-slider';

export function BeforeAfterSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-stone-50 via-slate-50 to-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <motion.h3
              className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Pred a Po
            </motion.h3>

            <motion.p
              className="text-base text-slate-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Pozrite si transformáciu budovy s STYRCON tepelnou izoláciou
            </motion.p>
          </div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
            transition={{ duration: 0.6, delay: 0.3 }}
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