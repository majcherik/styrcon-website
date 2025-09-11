'use client';

import React from 'react';
import { Card } from 'antd';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Brand partners data
const brandPartners = [
  {
    id: 1,
    name: 'Styrcon s.r.o.',
    logo: '/images/brands/styrcon-sro-logo.svg',
    website: 'https://www.styrcon.sk'
  },
  {
    id: 2,
    name: 'Polytex',
    logo: '/images/brands/polytex-logo.svg',
    website: '#'
  },
  // You can add more brands later
  {
    id: 3,
    name: 'Partner 3',
    logo: '/images/brands/styrcon-sro-logo.svg', // placeholder
    website: '#'
  },
  {
    id: 4,
    name: 'Partner 4',
    logo: '/images/brands/polytex-logo.svg', // placeholder
    website: '#'
  },
];

const getGridStyle = (isMobile: boolean) => ({
  width: isMobile ? '50%' : '25%',
  textAlign: 'center' as const,
  padding: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '120px',
});

const BrandPartnersGrid = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 px-4 max-w-7xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Partneri a značky s ktorými spolupracujeme
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Prezentujeme značky a partnerov, s ktorými spolupracujeme v oblasti stavebníctva a tepelnej izolácie
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card 
          className="shadow-lg border-0 overflow-hidden"
          style={{ 
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            border: '1px solid #e2e8f0'
          }}
        >
          {brandPartners.map((partner) => (
            <Card.Grid 
              key={partner.id}
              style={getGridStyle(isMobile)}
              className="hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <div className="flex flex-col items-center justify-center h-full w-full">
                <div className="relative w-24 h-16 mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                  {partner.name}
                </span>
              </div>
            </Card.Grid>
          ))}
        </Card>
      </div>

      {/* Optional: Add a note about partnerships */}
      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">
          Chcete sa stať naším partnerom? <a href="/kontakt" className="text-blue-600 hover:text-blue-700 hover:underline transition-colors">Kontaktujte nás</a>
        </p>
      </div>
    </motion.section>
  );
};

export default BrandPartnersGrid;