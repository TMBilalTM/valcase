"use client";

import { useMemo } from "react";

import { cn } from "@/lib/utils";

const connections = [
  { agent: "Jett", skin: "Prime Vandal" },
  { agent: "Killjoy", skin: "Spectrum Phantom" },
  { agent: "Omen", skin: "Reaver Knife" },
  { agent: "Raze", skin: "BlastX Odin" },
];

interface AnimatedBeamMultipleOutputDemoProps {
  className?: string;
}

export default function AnimatedBeamMultipleOutputDemo({ className }: AnimatedBeamMultipleOutputDemoProps) {
  const nodes = useMemo(() => connections, []);

  return (
    <div className={cn("relative h-full overflow-hidden rounded-3xl border border-white/10 bg-black/60 p-4 text-white", className)}>
      <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Ajan → Skin eşleşmesi</div>
      <div className="mt-4 space-y-3 text-sm">
        {nodes.map((node) => (
          <div key={node.agent} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-2">
            <span className="font-semibold">{node.agent}</span>
            <span className="text-xs text-white/60">{node.skin}</span>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -left-10 top-4 h-1 w-1 rounded-full bg-[#ff4655] shadow-[0_0_20px_#ff4655]" />
        <div className="absolute inset-x-0 top-6 h-px bg-linear-to-r from-transparent via-[#00f0ff] to-transparent" />
        <div className="absolute inset-x-0 bottom-6 h-px bg-linear-to-r from-transparent via-[#ff4655] to-transparent animate-glow" />
      </div>
    </div>
  );
}
