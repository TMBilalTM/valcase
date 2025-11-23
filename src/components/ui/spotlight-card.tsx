import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
  eyebrow?: string;
}

export function SpotlightCard({ title, description, action, className, eyebrow = "ValCase Plus" }: SpotlightCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-4xl border border-white/10 bg-[#101631] p-6 text-white shadow-[0_40px_120px_rgba(8,10,18,0.55)]",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-20%,rgba(91,141,255,0.6),transparent_45%),radial-gradient(circle_at_80%_0,rgba(248,192,124,0.45),transparent_40%)] opacity-70" />
      <div className="relative space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-white/70">{eyebrow}</p>
        <h2 className="text-3xl font-semibold leading-tight text-white">{title}</h2>
        <p className="text-sm text-white/70">{description}</p>
        {action}
      </div>
    </div>
  );
}
