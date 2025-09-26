import type { Metadata } from 'next';
import DynamicFrameLayout from '@/components/dynamic-frame/dynamic-frame-layout';

export const metadata: Metadata = {
  title: 'Galéria | STYRCON - E-MA SK s.r.o.',
  description: 'Galéria STYRCON produktov - tepelnoizolačné dosky, aplikácie, certifikáty a technické špecifikácie.',
  keywords: 'styrcon galéria, tepelná izolácia galéria, paropriepustné dosky foto, zateplenie budov obrázky',
};

export default function GaleriaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            STYRCON Galéria
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Objavte možnosti STYRCON tepelnoizolačných dosák. Interaktívna galéria vám umožní 
            preskúmať naše produkty, aplikácie a technické riešenia.
          </p>
        </div>
        
        <div className="mb-8">
          <DynamicFrameLayout />
        </div>
        
        <div className="text-center">
          <p className="text-slate-400 text-sm">
            Prejdite myšou nad jednotlivé sekcie pre detailnejší pohľad
          </p>
        </div>
      </div>
    </div>
  );
}