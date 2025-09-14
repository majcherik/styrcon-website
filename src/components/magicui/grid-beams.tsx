"use client";

import { motion } from "motion/react";
import React, { HTMLAttributes, useMemo } from "react";
import { cn } from "@/lib/utils";

const createGridMask = (start: number, end: number): string => {
  const mid = (start + end) / 2;
  return `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) ${start}%, rgba(0,0,0,0.2) ${mid}%, rgba(0,0,0,0.6) ${end - 20}%, rgba(0,0,0,1) ${end}%)`;
};

const generateRayConfig = (index: number, total: number) => {
  const progress = index / Math.max(total - 1, 1);
  const leftPercent = 2 + progress * 96;
  const rotation = 28 - progress * 56;
  const variation = (index * 0.618) % 1;

  return {
    left: `${leftPercent}%`,
    rotation,
    width: 40 + variation * 25,
    duration: 6 + variation * 5,
    delay: -variation * 10,
    swayDuration: 12 + variation * 9,
    swayDelay: -variation * 10,
    blur: 24 + variation * 9,
    strongSway: index % 2 === 0,
  };
};

interface GridBeamsProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gridSize?: number;
  gridColor?: string;
  rayCount?: number;
  rayOpacity?: number;
  raySpeed?: number;
  rayLength?: string;
  gridFadeStart?: number;
  gridFadeEnd?: number;
}

export const GridBeams: React.FC<GridBeamsProps> = ({
  children,
  gridSize = 20,
  gridColor = "rgba(255, 255, 255, 0.2)",
  rayCount = 20,
  rayOpacity = 0.55,
  raySpeed = 1.5,
  rayLength = "40vh",
  gridFadeStart = 5,
  gridFadeEnd = 90,
  className,
  ...props
}) => {
  const rays = useMemo(
    () =>
      Array.from({ length: rayCount }, (_, i) =>
        generateRayConfig(i, rayCount)
      ),
    [rayCount]
  );

  const gridMask = createGridMask(gridFadeStart, gridFadeEnd);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {/* Grid Background */}
      {gridSize > 0 && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${gridColor} 1px, transparent 1px),
              linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
            `,
            backgroundSize: `${gridSize}px ${gridSize}px`,
            mask: gridMask,
            WebkitMask: gridMask,
          }}
        />
      )}

      {/* Animated Rays */}
      <div className="absolute inset-0 pointer-events-none">
        {rays.map((ray, index) => (
          <motion.div
            key={index}
            className="absolute top-0 origin-top"
            style={{
              left: ray.left,
              width: `${ray.width}px`,
              height: rayLength,
              filter: `blur(${ray.blur}px)`,
            }}
            initial={{ opacity: 0, rotate: ray.rotation }}
            animate={{
              opacity: [0, rayOpacity, 0],
              rotate: ray.strongSway
                ? [ray.rotation - 5, ray.rotation + 5, ray.rotation - 5]
                : ray.rotation,
              scaleY: [0.8, 1.2, 0.8],
            }}
            transition={{
              opacity: {
                duration: ray.duration * raySpeed,
                repeat: Infinity,
                delay: ray.delay,
                ease: "easeInOut",
              },
              rotate: ray.strongSway
                ? {
                    duration: ray.swayDuration,
                    repeat: Infinity,
                    delay: ray.swayDelay,
                    ease: "easeInOut",
                  }
                : {},
              scaleY: {
                duration: ray.duration * raySpeed * 0.8,
                repeat: Infinity,
                delay: ray.delay * 0.5,
                ease: "easeInOut",
              },
            }}
          >
            <div
              className="h-full w-full"
              style={{
                background: `linear-gradient(to bottom, transparent 0%, ${gridColor.replace(
                  /[\d.]+\)$/,
                  `${rayOpacity})`
                )} 20%, ${gridColor.replace(
                  /[\d.]+\)$/,
                  `${rayOpacity * 0.8})`
                )} 80%, transparent 100%)`,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};