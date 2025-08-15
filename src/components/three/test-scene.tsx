'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { TestCube } from './test-cube'

export function TestScene() {
  return (
    <div className="w-full h-[400px] bg-slate-900 rounded-lg overflow-hidden">
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <TestCube position={[-1.2, 0, 0]} />
        <TestCube position={[1.2, 0, 0]} />
        
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}