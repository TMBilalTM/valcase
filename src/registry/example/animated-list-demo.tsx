"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const defaultFeed = [
  { user: "wraith", drop: "Prime Vandal", value: "₺1.250" },
  { user: "astra", drop: "Reaver Phantom", value: "₺980" },
  { user: "neon", drop: "RGX Operator", value: "₺1.450" },
  { user: "gekko", drop: "Magepunk Ghost", value: "₺520" },
  { user: "clove", drop: "Radiant Buddy", value: "₺110" },
  { user: "fade", drop: "Protocol Knife", value: "₺1.800" },
];

interface AnimatedListDemoProps {
  className?: string;
}

export default function AnimatedListDemo({ className }: AnimatedListDemoProps) {
  const [items, setItems] = useState(defaultFeed);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/60 p-4 text-white", className)}>
      <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Canlı drop feed</div>
      <ul className="mt-3 space-y-2">
        {items.slice(0, 4).map((item, index) => (
          <li
            key={`${item.user}-${index}`}
            className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-2 text-sm"
          >
            <div>
              <p className="font-semibold text-white">{item.drop}</p>
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">{item.user}</p>
            </div>
            <span className="text-white/70">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
