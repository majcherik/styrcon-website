import type { Metadata } from 'next';
import { AktualityClient } from './aktuality-client';

export const metadata: Metadata = {
  title: 'STYRCON Blog - Technické články a praktické rady | E-MA SK',
  description: 'Objavte najnovšie technické články, praktické rady a odborné informácie o STYRCON zatepľovaní a sanácii budov.',
  keywords: 'styrcon blog, technické články, zatepľovanie, sanácia budov, vlhké stavby, paropriepustnosť',
};

export default function AktualityPage() {
  return <AktualityClient />;
}