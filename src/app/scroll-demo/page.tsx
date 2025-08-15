import { ScrollVideoPlayer } from '@/components/scroll-video/scroll-video-player';

export default function ScrollDemoPage() {
  return (
    <div className="pt-16">
      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">
            Scroll-Controlled Video Demo
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Scroll down to control the video playback. The video progress follows your scroll position, 
            creating an immersive storytelling experience.
          </p>
          <div className="text-sm text-slate-500 bg-slate-50 rounded-lg p-4">
            <p className="font-medium mb-2">How it works:</p>
            <ul className="text-left max-w-md mx-auto space-y-1">
              <li>• Video plays as you scroll down</li>
              <li>• Scroll position controls video time</li>
              <li>• Use manual controls for play/pause</li>
              <li>• Click volume button to unmute</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Scroll Video Section */}
      <ScrollVideoPlayer
        videoSrc="/10.mp4"
        posterSrc="/10.jpg"
        height="300vh"
        showControls={true}
        className="bg-slate-900"
      />

      {/* Conclusion Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            STYRCON Innovation
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Experience the future of building materials through interactive storytelling. 
            Our paropriepustné tepelnoizolačné dosky represent cutting-edge technology in construction.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">A1</div>
              <div className="text-sm font-medium text-slate-900">Fire Class</div>
              <div className="text-xs text-slate-600">Non-combustible</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">≤ 3</div>
              <div className="text-sm font-medium text-slate-900">Vapor Permeability</div>
              <div className="text-xs text-slate-600">μ Factor</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">0.041</div>
              <div className="text-sm font-medium text-slate-900">Thermal Conductivity</div>
              <div className="text-xs text-slate-600">W/mK</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}