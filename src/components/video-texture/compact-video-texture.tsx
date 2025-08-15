'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useAspect } from '@react-three/drei'
import { VideoMaterial } from './video-material'
import { FallbackMaterial } from './fallback-material'

interface CompactVideoTextureProps {
  videoUrl?: string
  fallbackImageUrl?: string
  className?: string
}

export function CompactVideoTexture({
  videoUrl = '10.mp4',
  fallbackImageUrl = '10.jpg',
  className = 'w-full h-full'
}: CompactVideoTextureProps) {
  return (
    <div className={className}>
      <Canvas orthographic camera={{ zoom: 1 }}>
        <CompactScene
          videoUrl={videoUrl}
          fallbackImageUrl={fallbackImageUrl}
        />
      </Canvas>
    </div>
  )
}

interface CompactSceneProps {
  videoUrl: string
  fallbackImageUrl: string
}

function CompactScene({ videoUrl, fallbackImageUrl }: CompactSceneProps) {
  // Use square aspect ratio for hero section integration
  const size = useAspect(1, 1)
  
  return (
    <mesh scale={size}>
      <planeGeometry />
      <Suspense fallback={<FallbackMaterial url={fallbackImageUrl} />}>
        <VideoMaterial url={videoUrl} />
      </Suspense>
    </mesh>
  )
}