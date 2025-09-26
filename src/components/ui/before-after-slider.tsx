'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({ beforeImage, afterImage, beforeLabel = "PRED", afterLabel = "PO" }: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const handle = handleRef.current;

    if (!container || !handle) return;

    const onMouseDown = () => {
      setIsDragging(true);
    };

    const onTouchStart = () => {
      setIsDragging(true);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const containerRect = container.getBoundingClientRect();
      const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      setPosition(Math.max(0, Math.min(100, newPosition)));
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();

      const containerRect = container.getBoundingClientRect();
      const touch = e.touches[0];
      const newPosition = ((touch.clientX - containerRect.left) / containerRect.width) * 100;
      setPosition(Math.max(0, Math.min(100, newPosition)));
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    const onTouchEnd = () => {
      setIsDragging(false);
    };

    // Mouse events
    handle.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // Touch events
    handle.addEventListener('touchstart', onTouchStart, { passive: false });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      handle.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      handle.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging]);

  return (
    <div className="relative w-full h-[40vh] overflow-hidden select-none rounded-xl" ref={containerRef}>
      {/* Before Image */}
      <div className="absolute inset-0">
        <Image
          src={beforeImage}
          alt="Before"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover pointer-events-none"
          priority={false}
        />
        {/* Before Label */}
        <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
          {beforeLabel}
        </div>
      </div>

      {/* After Image */}
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={afterImage}
          alt="After"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover pointer-events-none"
          priority={false}
        />
        {/* After Label */}
        <div className="absolute top-3 right-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
          {afterLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div
        ref={handleRef}
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize touch-action-none z-10 shadow-lg"
        style={{ left: `${position}%` }}
        role="slider"
        aria-label="Porovnávanie obrázkov pred a po"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        tabIndex={0}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-slate-200 focus:ring-2 focus:ring-primary focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-600"
          >
            <path d="m9 18 6-6-6-6" />
            <path d="m15 18 6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}