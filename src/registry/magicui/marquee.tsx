import { Children, ReactNode, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  pauseOnHover?: boolean;
  duration?: string;
}

export function Marquee({ children, className, pauseOnHover, duration = "22s" }: MarqueeProps) {
  const content = Children.toArray(children);
  const marqueeStyle: CSSProperties = { ["--duration" as string]: duration };

  return (
    <div className={cn("relative overflow-hidden", className)} data-marquee={pauseOnHover ? "pause" : undefined}>
      <div className="flex animate-marquee gap-4" style={marqueeStyle}>
        {[...content, ...content].map((child, index) => (
          <div key={index} className="shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
