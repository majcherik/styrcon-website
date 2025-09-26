'use client'

import { Suspense, lazy } from 'react'
import { Loader2 } from 'lucide-react'

// Lazy load the gallery component for better performance
const ProjectGallerySimple = lazy(() =>
  import('@/components/sections/project-gallery-simple').then(module => ({
    default: module.ProjectGallerySimple
  }))
)

// Loading component for gallery
function GalleryFallback() {
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-slate-600">Načítava sa galéria projektov...</p>
        <p className="text-sm text-slate-500 mt-1">STYRCON zatepľovanie budov</p>
      </div>
    </div>
  )
}

export function LazyGallery(props: any) {
  return (
    <Suspense fallback={<GalleryFallback />}>
      <ProjectGallerySimple {...props} />
    </Suspense>
  )
}