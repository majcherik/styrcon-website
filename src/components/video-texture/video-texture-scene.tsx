'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useAspect } from '@react-three/drei'
import { VideoMaterial } from './video-material'
import { FallbackMaterial } from './fallback-material'

interface VideoTextureSceneProps {
  videoUrl?: string
  fallbackImageUrl?: string
  aspectWidth?: number
  aspectHeight?: number
  className?: string
}

export function VideoTextureScene({
  videoUrl = 'https://i.imgur.com/tgzP8L1.mp4',
  fallbackImageUrl = 'https://i.imgur.com/JqA3wIr.jpeg',
  aspectWidth = 1800,
  aspectHeight = 1000,
  className = 'w-full h-[600px]'
}: VideoTextureSceneProps) {
  return (
    <div className={className}>
      <Canvas orthographic>
        <Scene
          videoUrl={videoUrl}
          fallbackImageUrl={fallbackImageUrl}
          aspectWidth={aspectWidth}
          aspectHeight={aspectHeight}
        />
      </Canvas>
    </div>
  )
}

interface SceneProps {
  videoUrl: string
  fallbackImageUrl: string
  aspectWidth: number
  aspectHeight: number
}

function Scene({ videoUrl, fallbackImageUrl, aspectWidth, aspectHeight }: SceneProps) {
  const size = useAspect(aspectWidth, aspectHeight)
  
  return (
    <mesh scale={size}>
      <planeGeometry />
      <Suspense fallback={<FallbackMaterial url={fallbackImageUrl} />}>
        <VideoMaterial url={videoUrl} />
      </Suspense>
    </mesh>
  )
}