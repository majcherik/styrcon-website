'use client'

import { Suspense, lazy } from 'react'
import { Play, Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'

// Lazy load video components for better performance
const ScrollVideoHero = lazy(() =>
  import('@/components/sections/scroll-video-hero').then(module => ({
    default: module.ScrollVideoHero
  }))
)

const CanvasScrollSection = lazy(() =>
  import('@/components/sections/canvas-scroll-section').then(module => ({
    default: module.CanvasScrollSection
  }))
)

// Loading component for video sections
function VideoSectionFallback() {
  return (
    <Card className="w-full min-h-[500px] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Play className="h-8 w-8 text-blue-600" />
          </div>
          <Loader2 className="absolute inset-0 h-20 w-20 animate-spin text-blue-600/30" />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-medium text-slate-700">Načítava sa video obsah</p>
          <p className="text-sm text-slate-500">STYRCON tepelnoizolačné riešenia</p>
        </div>
      </div>
    </Card>
  )
}

export function LazyScrollVideoHero(props: any) {
  return (
    <Suspense fallback={<VideoSectionFallback />}>
      <ScrollVideoHero {...props} />
    </Suspense>
  )
}

export function LazyCanvasScrollSection(props: any) {
  return (
    <Suspense fallback={<VideoSectionFallback />}>
      <CanvasScrollSection {...props} />
    </Suspense>
  )
}