import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

interface BentoGridItemProps {
  title: string;
  description: string;
  icon?: ReactNode;
  footer?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4 md:grid-cols-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({ title, description, icon, footer, className, children }: BentoGridItemProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-3xl border border-white/10 bg-[#0f1424] p-5 text-white shadow-[0_10px_40px_rgba(2,6,23,0.45)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 text-sm text-white/70">
        {icon}
        <span className="font-medium uppercase tracking-[0.3em] text-white/50">{title}</span>
      </div>
      <p className="mt-4 text-xl font-semibold text-white">{description}</p>
      <div className="mt-4 flex-1 text-sm text-white/60">{children}</div>
      {footer ? <div className="mt-5 text-xs text-white/60">{footer}</div> : null}
    </div>
  );
}
