import type { Metadata } from 'next';
import { TestScene } from '@/components/three/test-scene';

export const metadata: Metadata = {
  title: 'Test 3D | STYRCON - E-MA SK s.r.o.',
  description: 'Test stránka pre 3D integráciu s React Three Fiber.',
};

export default function Test3DPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            3D Test Scene
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Test integrácie React Three Fiber s Next.js projektom. 
            Interaktívne 3D kocky s STYRCON farbami.
          </p>
        </div>
        
        <div className="mb-8">
          <TestScene />
        </div>
        
        <div className="text-center space-y-4">
          <p className="text-slate-400 text-sm">
            🖱️ Kliknite na kocky pre zväčšenie | Použite myš pre otáčanie a zoom
          </p>
          <div className="flex justify-center space-x-8 text-sm text-slate-300">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span>Štandardná farba</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-sky-500 rounded"></div>
              <span>Hover farba</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}