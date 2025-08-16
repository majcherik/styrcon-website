"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BeamsBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

function createBeam(width: number, height: number): Beam {
  const angle = -35 + Math.random() * 10;
  // STYRCON blue theme colors
  const hueBase = 210; // Blue base
  const hueRange = 40; // Blue to cyan range

  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle: angle,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.08 + Math.random() * 0.12, // Subtle for STYRCON
    hue: hueBase + Math.random() * hueRange,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  };
}

export default function BeamsBackground({
  className,
  children,
  intensity = "subtle",
}: BeamsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const animationFrameRef = useRef<number>(0);
  const MINIMUM_BEAMS = intensity === "subtle" ? 15 : intensity === "medium" ? 25 : 35;

  const opacityMap = {
    subtle: 0.5,
    medium: 0.7,
    strong: 1,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      const totalBeams = MINIMUM_BEAMS * 1.2;
      beamsRef.current = Array.from({ length: totalBeams }, () =>
        createBeam(canvas.width, canvas.height)
      );
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    function resetBeam(beam: Beam, index: number, totalBeams: number) {
      if (!canvas) return beam;

      const column = index % 3;
      const spacing = canvas.width / 3;

      // STYRCON blue theme
      const hueBase = 210;
      const hueRange = 40;

      beam.y = canvas.height + 100;
      beam.x =
        column * spacing +
        spacing / 2 +
        (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 80 + Math.random() * 80;
      beam.speed = 0.4 + Math.random() * 0.3; // Slower for subtlety
      beam.hue = hueBase + (index * hueRange) / totalBeams;
      beam.opacity = 0.06 + Math.random() * 0.08; // More subtle
      return beam;
    }

    function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);

      const pulsingOpacity =
        beam.opacity *
        (0.8 + Math.sin(beam.pulse) * 0.2) *
        opacityMap[intensity];

      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);

      // STYRCON brand colors - professional blue
      const saturation = "60%"; // More muted for professional look
      const lightness = "55%";

      gradient.addColorStop(
        0,
        `hsla(${beam.hue}, ${saturation}, ${lightness}, 0)`
      );
      gradient.addColorStop(
        0.1,
        `hsla(${beam.hue}, ${saturation}, ${lightness}, ${
          pulsingOpacity * 0.3
        })`
      );
      gradient.addColorStop(
        0.4,
        `hsla(${beam.hue}, ${saturation}, ${lightness}, ${pulsingOpacity})`
      );
      gradient.addColorStop(
        0.6,
        `hsla(${beam.hue}, ${saturation}, ${lightness}, ${pulsingOpacity})`
      );
      gradient.addColorStop(
        0.9,
        `hsla(${beam.hue}, ${saturation}, ${lightness}, ${
          pulsingOpacity * 0.3
        })`
      );
      gradient.addColorStop(
        1,
        `hsla(${beam.hue}, ${saturation}, ${lightness}, 0)`
      );

      ctx.fillStyle = gradient;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    }

    function animate() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = "blur(25px)"; // Less blur for sharper effect

      const totalBeams = beamsRef.current.length;
      beamsRef.current.forEach((beam, index) => {
        beam.y -= beam.speed;
        beam.pulse += beam.pulseSpeed;

        // Reset beam when it goes off screen
        if (beam.y + beam.length < -100) {
          resetBeam(beam, index, totalBeams);
        }

        drawBeam(ctx, beam);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [intensity, MINIMUM_BEAMS]);

  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ filter: "blur(8px)" }}
      />

      <motion.div
        className="absolute inset-0 bg-slate-50/10"
        animate={{
          opacity: [0.02, 0.08, 0.02],
        }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
        style={{
          backdropFilter: "blur(20px)",
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}