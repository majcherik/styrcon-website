'use client'

import { useTexture } from '@react-three/drei'

interface FallbackMaterialProps {
  url: string
}

export function FallbackMaterial({ url }: FallbackMaterialProps) {
  const texture = useTexture(url)
  return <meshBasicMaterial map={texture} toneMapped={false} />
}