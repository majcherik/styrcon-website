"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FrameComponent } from "./frame-component"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"


interface Frame {
  id: number
  image: string
  defaultPos: { x: number; y: number; w: number; h: number }
  corner: string
  edgeHorizontal: string
  edgeVertical: string
  mediaSize: number
  borderThickness: number
  borderSize: number
  title: string
}

const initialFrames: Frame[] = [
  {
    id: 1,
    image: "/placeholder.jpg",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    corner: "/placeholder.svg",
    edgeHorizontal: "/placeholder.svg",
    edgeVertical: "/placeholder.svg",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    title: "STYRCON Tepelná izolácia"
  },
  {
    id: 2,
    image: "/placeholder.jpg",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    corner: "/placeholder.svg",
    edgeHorizontal: "/placeholder.svg",
    edgeVertical: "/placeholder.svg",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    title: "Paropriepustné dosky"
  },
  {
    id: 3,
    image: "/placeholder.jpg",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    corner: "/placeholder.svg",
    edgeHorizontal: "/placeholder.svg",
    edgeVertical: "/placeholder.svg",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    title: "Nehorľavá trieda A1"
  },
  {
    id: 4,
    image: "/placeholder.jpg",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    corner: "/placeholder.svg",
    edgeHorizontal: "/placeholder.svg",
    edgeVertical: "/placeholder.svg",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    title: "Zateplenie budov"
  },
  {
    id: 5,
    image: "/placeholder.jpg",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    corner: "/placeholder.svg",
    edgeHorizontal: "/placeholder.svg",
    edgeVertical: "/placeholder.svg",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    title: "Aplikácia STYRCON"
  },
  {
    id: 6,
    image: "/placeholder.jpg",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    corner: "/placeholder.svg",
    edgeHorizontal: "/placeholder.svg",
    edgeVertical: "/placeholder.svg",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    title: "Sanačné zateplenie"
  },
  {
    id: 7,
    image: "/placeholder.jpg",
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    corner: "/placeholder.svg",
    edgeHorizontal: "/placeholder.svg",
    edgeVertical: "/placeholder.svg",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    title: "Technické špecifikácie"
  },
  {
    id: 8,
    image: "/placeholder.jpg",
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    corner: "/placeholder.svg",
    edgeHorizontal: "/placeholder.svg",
    edgeVertical: "/placeholder.svg",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    title: "Certifikáty a normy"
  },
  {
    id: 9,
    image: "/placeholder.jpg",
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    corner: "/placeholder.svg",
    edgeHorizontal: "/placeholder.svg",
    edgeVertical: "/placeholder.svg",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    title: "Montážne inštrukcie"
  },
]

export default function DynamicFrameLayout() {
  const [frames, setFrames] = useState<Frame[]>(initialFrames)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
  const [hoverSize, setHoverSize] = useState(6)
  const [gapSize, setGapSize] = useState(4)
  const [showControls, setShowControls] = useState(false)
  const [cleanInterface, setCleanInterface] = useState(true)
  const [showFrames, setShowFrames] = useState(false)

  const getRowSizes = () => {
    if (hovered === null) {
      return "4fr 4fr 4fr"
    }
    const { row } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getColSizes = () => {
    if (hovered === null) {
      return "4fr 4fr 4fr"
    }
    const { col } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : y === 4 ? "center" : "bottom"
    const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right"
    return `${vertical} ${horizontal}`
  }

  const updateFrameProperty = (id: number, property: keyof Frame, value: number) => {
    setFrames(frames.map((frame) => (frame.id === id ? { ...frame, [property]: value } : frame)))
  }

  const toggleControls = () => {
    setShowControls(!showControls)
  }

  const toggleCleanInterface = () => {
    setCleanInterface(!cleanInterface)
    if (!cleanInterface) {
      setShowControls(false)
    }
  }

  return (
    <div className="space-y-4 w-full h-full bg-slate-900 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch id="frame-toggle" checked={showFrames} onCheckedChange={setShowFrames} />
            <label htmlFor="frame-toggle" className="text-sm text-white/70">
              {showFrames ? "Skryť rámčeky" : "Zobraziť rámčeky"}
            </label>
          </div>
        </div>
        {!cleanInterface && (
          <div className="space-x-2">
            <Button onClick={toggleControls}>{showControls ? "Skryť ovládanie" : "Zobraziť ovládanie"}</Button>
            <Button onClick={toggleCleanInterface}>{cleanInterface ? "Zobraziť UI" : "Skryť UI"}</Button>
          </div>
        )}
      </div>
      
      {!cleanInterface && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">STYRCON Galéria</h2>
        </div>
      )}
      
      {!cleanInterface && showControls && (
        <>
          <div className="space-y-2">
            <label htmlFor="hover-size" className="block text-sm font-medium text-gray-200">
              Veľkosť pri hover: {hoverSize}
            </label>
            <Slider
              id="hover-size"
              min={4}
              max={8}
              step={0.1}
              value={[hoverSize]}
              onValueChange={(value) => setHoverSize(value[0])}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="gap-size" className="block text-sm font-medium text-gray-200">
              Veľkosť medzier: {gapSize}px
            </label>
            <Slider
              id="gap-size"
              min={0}
              max={20}
              step={1}
              value={[gapSize]}
              onValueChange={(value) => setGapSize(value[0])}
            />
          </div>
        </>
      )}
      
      <div
        className="relative w-full h-[600px]"
        style={{
          display: "grid",
          gridTemplateRows: getRowSizes(),
          gridTemplateColumns: getColSizes(),
          gap: `${gapSize}px`,
          transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
        }}
      >
        {frames.map((frame) => {
          const row = Math.floor(frame.defaultPos.y / 4)
          const col = Math.floor(frame.defaultPos.x / 4)
          const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y)

          return (
            <motion.div
              key={frame.id}
              className="relative group cursor-pointer"
              style={{
                transformOrigin,
                transition: "transform 0.4s ease",
              }}
              onMouseEnter={() => setHovered({ row, col })}
              onMouseLeave={() => setHovered(null)}
            >
              <FrameComponent
                image={frame.image}
                width="100%"
                height="100%"
                className="absolute inset-0"
                corner={frame.corner}
                edgeHorizontal={frame.edgeHorizontal}
                edgeVertical={frame.edgeVertical}
                mediaSize={frame.mediaSize}
                borderThickness={frame.borderThickness}
                borderSize={frame.borderSize}
                onMediaSizeChange={(value) => updateFrameProperty(frame.id, "mediaSize", value)}
                onBorderThicknessChange={(value) => updateFrameProperty(frame.id, "borderThickness", value)}
                onBorderSizeChange={(value) => updateFrameProperty(frame.id, "borderSize", value)}
                showControls={showControls && !cleanInterface}
                label={frame.title}
                showFrame={showFrames}
              />
              
              {/* Title overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <h3 className="text-white font-semibold text-lg drop-shadow-lg">
                  {frame.title}
                </h3>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}