'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { TextAnimate } from '@/components/magicui/text-animate';
import * as THREE from 'three';

interface ScrollBox3DProps {
  text: React.ReactNode;
  color: string;
  position: [number, number, number];
}

function ScrollBox3D({ text, color, position }: ScrollBox3DProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <mesh 
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color={hovered ? '#f59e0b' : color} 
        transparent 
        opacity={0.8} 
      />
      <Html position={[0, 0, 1.1]} center className="pointer-events-none">
        <div className="bg-stone-800/90 backdrop-blur-sm rounded-lg p-4 min-w-64 text-center border border-stone-600">
          {text}
        </div>
      </Html>
    </mesh>
  );
}

function ScrollContainer({ scroll, children }: { 
  scroll: React.MutableRefObject<number>; 
  children: React.ReactNode;
}) {
  const { viewport } = useThree();
  const group = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (group.current) {
      group.current.position.y = THREE.MathUtils.damp(
        group.current.position.y, 
        viewport.height * scroll.current, 
        4, 
        delta
      );
    }
  });
  
  return <group ref={group}>{children}</group>;
}

function Scene() {
  const viewport = useThree((state) => state.viewport);
  
  const contentSections = [
    {
      text: (
        <div className="text-white">
          <h3 className="text-xl font-bold mb-2 text-amber-200">Nehorľavosť A1</h3>
          <p className="text-sm text-stone-200">Najvyššia trieda požiarnej bezpečnosti podľa EN 13501-1</p>
          <span className="inline-block mt-2 px-3 py-1 bg-red-600/20 rounded-full text-red-400 font-bold">A1</span>
        </div>
      ),
      color: '#dc2626',
      position: [0, 0, 0] as [number, number, number]
    },
    {
      text: (
        <div className="text-white">
          <h3 className="text-xl font-bold mb-2 text-amber-200">Paropriepustnosť</h3>
          <p className="text-sm text-stone-200">Faktor difúzneho odporu μ ≤ 3 umožňuje prirodzené vysychanie</p>
          <span className="inline-block mt-2 px-3 py-1 bg-blue-600/20 rounded-full text-blue-400 font-bold">μ ≤ 3</span>
        </div>
      ),
      color: '#2563eb',
      position: [0, -viewport.height, 0] as [number, number, number]
    },
    {
      text: (
        <div className="text-white">
          <h3 className="text-xl font-bold mb-2 text-amber-200">Tepelná izolácia</h3>
          <p className="text-sm text-stone-200">Výnimočné izolačné vlastnosti λ = 0,041 W/mK</p>
          <span className="inline-block mt-2 px-3 py-1 bg-green-600/20 rounded-full text-green-400 font-bold">0,041 W/mK</span>
        </div>
      ),
      color: '#16a34a',
      position: [0, -viewport.height * 2, 0] as [number, number, number]
    },
    {
      text: (
        <div className="text-white">
          <h3 className="text-xl font-bold mb-2 text-amber-200">Mechanická pevnosť</h3>
          <p className="text-sm text-stone-200">Pevnosť v tlaku ≥ 150 kPa pri 10% deformácii</p>
          <span className="inline-block mt-2 px-3 py-1 bg-amber-600/20 rounded-full text-amber-400 font-bold">≥ 150 kPa</span>
        </div>
      ),
      color: '#d97706',
      position: [0, -viewport.height * 3, 0] as [number, number, number]
    }
  ];

  return (
    <>
      {contentSections.map((section, index) => (
        <ScrollBox3D
          key={index}
          text={section.text}
          color={section.color}
          position={section.position}
        />
      ))}
    </>
  );
}

export function CanvasScrollSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="relative w-full h-[400vh] bg-gradient-to-b from-stone-100 to-stone-200">
        <div className="sticky top-0 w-full h-screen flex items-center justify-center bg-stone-900">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
            <p className="text-stone-300">Načítavam 3D obsah...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* 3D Canvas */}
      <Canvas 
        className="fixed top-0 left-0 w-full h-screen pointer-events-none z-10"
        camera={{ position: [0, 0, 5], fov: 75 }}
        eventSource={typeof window !== 'undefined' ? document.getElementById('canvas-scroll-root') || undefined : undefined}
        eventPrefix="client"
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <ScrollContainer scroll={scroll}>
          <Scene />
        </ScrollContainer>
      </Canvas>

      {/* Scrollable Content */}
      <div
        id="canvas-scroll-root"
        ref={scrollRef}
        onScroll={(e) => {
          const element = e.target as HTMLDivElement;
          scroll.current = element.scrollTop / (element.scrollHeight - element.clientHeight);
        }}
        className="relative w-full h-[400vh] bg-gradient-to-b from-stone-100 to-stone-200 z-20"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Section Headers */}
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="text-center max-w-2xl mx-auto px-4">
            <TextAnimate
              animation="blurInUp"
              by="character"
              className="text-4xl lg:text-6xl font-bold text-stone-900 mb-6"
              as="h2"
            >
              Prečo STYRCON?
            </TextAnimate>
            
            <TextAnimate
              animation="blurIn"
              className="text-xl text-stone-600 leading-relaxed"
              delay={1.0}
            >
              Objavte jedinečné vlastnosti našich tepelnoizolačných dosiek pomocou 3D prezentácie
            </TextAnimate>
            
            <TextAnimate
              animation="fadeIn"
              className="mt-8 text-sm text-stone-500"
              delay={1.5}
            >
              Scrollujte nadol pre interaktívny prehľad ↓
            </TextAnimate>
          </div>
        </div>
        
        {/* Spacer content for scroll sections */}
        <div className="h-screen"></div>
        <div className="h-screen"></div>
        <div className="h-screen"></div>
      </div>
    </div>
  );
}