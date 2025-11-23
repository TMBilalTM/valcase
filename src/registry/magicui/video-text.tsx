import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface VideoTextProps {
  src: string;
  children: ReactNode;
  className?: string;
  poster?: string;
}

export function VideoText({ src, children, className, poster }: VideoTextProps) {
  return (
    <div className={cn("relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl", className)}>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/80 to-black/95" />
      <span className="relative text-5xl font-black uppercase tracking-[0.5em] text-white drop-shadow-[0_15px_40px_rgba(0,0,0,0.8)] md:text-7xl lg:text-8xl">
        {children}
      </span>
    </div>
  );
}
