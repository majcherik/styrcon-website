'use client'

import { useVideoTexture } from '@react-three/drei'

interface VideoMaterialProps {
  url: string
}

export function VideoMaterial({ url }: VideoMaterialProps) {
  const texture = useVideoTexture(url)
  return <meshBasicMaterial map={texture} toneMapped={false} />
}