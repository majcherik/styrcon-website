import type { Metadata } from 'next';
import { VideoTextureScene } from '@/components/video-texture/video-texture-scene';

export const metadata: Metadata = {
  title: 'Video Demo | STYRCON - E-MA SK s.r.o.',
  description: 'Demonštrácia video textúr s React Three Fiber - interaktívne video zobrazovanie pre STYRCON produkty.',
  keywords: 'styrcon video, video texture, react three fiber, 3d video, interaktívne video',
};

export default function VideoDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Video Textúry Demo
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Demonštrácia pokročilých video textúr s React Three Fiber. 
            Táto technológia umožňuje integráciu videí priamo do 3D scén 
            pre interaktívne prezentácie STYRCON produktov.
          </p>
        </div>
        
        <div className="mb-8 bg-slate-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Základná Video Textúra
          </h2>
          <VideoTextureScene 
            videoUrl="https://i.imgur.com/tgzP8L1.mp4"
            fallbackImageUrl="https://i.imgur.com/JqA3wIr.jpeg"
            className="w-full h-[600px] rounded-lg overflow-hidden"
          />
        </div>

        <div className="mb-8 bg-slate-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Kompaktná Verzia
          </h2>
          <VideoTextureScene 
            videoUrl="https://i.imgur.com/tgzP8L1.mp4"
            fallbackImageUrl="https://i.imgur.com/JqA3wIr.jpeg"
            aspectWidth={1600}
            aspectHeight={900}
            className="w-full h-[400px] rounded-lg overflow-hidden"
          />
        </div>
        
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-white">
            Technické Vlastnosti
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-300">
            <div className="bg-slate-700 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Video Formát</h4>
              <p>MP4 s automatickým prehravaním a slučkou</p>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Fallback Podpora</h4>
              <p>JPG obrázok počas načítavania videa</p>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Responzívny Dizajn</h4>
              <p>Automatické prispôsobenie poměru strán</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-900/30 rounded-lg">
            <p className="text-blue-200 text-sm">
              💡 <strong>Budúce Použitie:</strong> Táto technológia bude využitá na interaktívne prezentácie 
              STYRCON tepelnoizolačných dosák, inštalačných procesov a technických vlastností.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}