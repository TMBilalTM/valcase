import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import type { LucideProps } from "lucide-react";

import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(260px,1fr)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  Icon?: ComponentType<LucideProps> | ComponentType<{ className?: string }>;
  name: string;
  description: string;
  href?: string;
  cta?: string;
  className?: string;
  background?: ReactNode;
}

export function BentoCard({ Icon, name, description, href = "#", cta = "İncele", className, background }: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative col-span-full overflow-hidden rounded-3xl border border-white/10 bg-[#050912]/90 p-6 text-white shadow-[0_20px_60px_rgba(5,9,18,0.55)] transition",
        "hover:border-white/30",
        className,
      )}
    >
      {background ? (
        <div className="pointer-events-none absolute inset-0 z-0">
          {background}
        </div>
      ) : null}
      <div className="pointer-events-none absolute inset-0 z-1 bg-linear-to-b from-[#050912]/30 via-[#050912]/45 to-[#050912]/80" />
      <div className="relative z-2 flex h-full flex-col gap-6">
        <div className="space-y-4 opacity-0 transition duration-300 group-hover:opacity-100 group-hover:drop-shadow-[0_8px_35px_rgba(0,0,0,0.45)]">
          <p className="text-2xl font-semibold leading-tight text-white">{description}</p>
          {href ? (
            <Link
              href={href}
              className="inline-flex w-max items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#ff4655]"
            >
              {cta}
              <span aria-hidden>↗</span>
            </Link>
          ) : (
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/40">{cta}</span>
          )}
        </div>
        <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-white/45 transition duration-300 group-hover:text-white/80">
          {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
          <span className="font-medium text-white/50">{name}</span>
        </div>
      </div>
    </div>
  );
}
