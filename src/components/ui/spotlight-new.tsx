"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface SpotlightProps {
  className?: string;
}

export function Spotlight({ className }: SpotlightProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (event: PointerEvent) => {
      setCoords({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, []);

  return (
    <div
      className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${className ?? ""}`}
      style={{
        background: `radial-gradient(circle at ${coords.x || 0}px ${coords.y || 0}px, rgba(255,255,255,0.18), transparent 45%)`,
      }}
    />
  );
}

interface SpotlightBackgroundProps {
  children: ReactNode;
}

export function SpotlightBackground({ children }: SpotlightBackgroundProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black/96 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <Spotlight />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function SpotlightNewDemo() {
  return (
    <div className="h-160 w-full rounded-md flex md:items-center md:justify-center bg-black/96 antialiased relative overflow-hidden">
      <Spotlight />
      <div className="p-4 max-w-4xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-linear-to-b from-neutral-50 to-neutral-400">
          Spotlight <br /> which is not overused.
        </h1>
        <p className="mt-4 text-base text-neutral-300 max-w-xl text-center mx-auto">
          A subtle yet effective spotlight effect, because the previous version is used a bit too much these days.
        </p>
      </div>
    </div>
  );
}
