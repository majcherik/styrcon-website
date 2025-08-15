'use client';

import { ScrollVideoPlayer } from './scroll-video-player';

interface ScrollVideoSectionProps {
  title?: string;
  description?: string;
  videoSrc?: string;
  posterSrc?: string;
  height?: string;
  showControls?: boolean;
}

export function ScrollVideoSection({
  title = "Interactive Experience",
  description = "Scroll to explore our innovative building materials in action.",
  videoSrc = "/10.mp4",
  posterSrc = "/10.jpg",
  height = "200vh",
  showControls = true,
}: ScrollVideoSectionProps) {
  return (
    <section className="bg-white">
      {/* Introduction */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{title}</h2>
          <p className="text-lg text-slate-600 mb-8">{description}</p>
          <div className="text-sm text-slate-500 bg-white rounded-lg p-4 inline-block">
            <p className="font-medium mb-2">Scroll to control playback</p>
            <div className="flex items-center justify-center gap-4 text-xs">
              <span>⬇️ Scroll Down</span>
              <span>🎬 Video Plays</span>
              <span>🔊 Click to Unmute</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Video */}
      <ScrollVideoPlayer
        videoSrc={videoSrc}
        posterSrc={posterSrc}
        height={height}
        showControls={showControls}
      />
    </section>
  );
}