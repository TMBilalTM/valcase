import { ReactNode } from "react";

interface PanelProps {
  children: ReactNode;
  className?: string;
}

export function GlassPanel({ children, className = "" }: PanelProps) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_50px_rgba(15,23,42,0.35)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}
