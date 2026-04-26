"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type TrailItem = {
  id: number;
  x: number;
  y: number;
  src: string;
  rotation: number;
};

type ImageTrailProps = {
  images: string[];
};

export function ImageTrail({ images }: ImageTrailProps) {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageIndexRef = useRef(0);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const nextIdRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || images.length === 0) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        return;
      }

      const lastPoint = lastPointRef.current;

      if (lastPoint) {
        const dx = x - lastPoint.x;
        const dy = y - lastPoint.y;
        const distance = Math.hypot(dx, dy);

        if (distance < 60) {
          return;
        }
      }

      lastPointRef.current = { x, y };

      const src = images[imageIndexRef.current % images.length];
      imageIndexRef.current += 1;

      const nextItem: TrailItem = {
        id: nextIdRef.current++,
        x,
        y,
        src,
        rotation: (Math.random() - 0.5) * 18,
      };

      setTrail((current) => [...current.slice(-7), nextItem]);

      window.setTimeout(() => {
        setTrail((current) => current.filter((item) => item.id !== nextItem.id));
      }, 1200);
    };

    container.addEventListener("mousemove", handleMove);

    return () => {
      container.removeEventListener("mousemove", handleMove);
    };
  }, [images]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[28rem] overflow-hidden rounded-[2rem] border border-zinc-200 bg-[radial-gradient(circle_at_top,#f4f4f5,transparent_45%),linear-gradient(180deg,#ffffff,#f4f4f5)] dark:border-zinc-800 dark:bg-[radial-gradient(circle_at_top,#18181b,transparent_45%),linear-gradient(180deg,#09090b,#111827)]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:28px_28px] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" />

      <div className="relative z-10 flex h-full min-h-[28rem] flex-col justify-between p-8">
        <div className="max-w-xl space-y-4">
          <span className="inline-flex rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
            Interactive
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Image Trail Effect
          </h2>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Move your cursor across this area and the gallery starts leaving a
            floating trail of images behind it.
          </p>
        </div>

        <p className="relative z-10 text-sm text-zinc-500">
          Hover and move around this section to activate the trail.
        </p>
      </div>

      {trail.map((item) => (
        <div
          key={item.id}
          className="pointer-events-none absolute h-32 w-24 overflow-hidden rounded-2xl border border-white/60 shadow-2xl transition-opacity duration-500 dark:border-zinc-700"
          style={{
            left: item.x - 48,
            top: item.y - 64,
            transform: `rotate(${item.rotation}deg)`,
          }}
        >
          <Image
            src={item.src}
            alt=""
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
