import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DockProps {
  children: ReactNode;
  className?: string;
}

interface DockItemProps {
  label: ReactNode;
  icon: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export function Dock({ children, className }: DockProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-3 rounded-full border border-white/10 bg-[#0c1122]/90 px-4 py-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DockItem({ label, icon, active, onClick }: DockItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/70 transition",
        active ? "bg-white/15 text-white" : "hover:bg-white/10",
      )}
    >
      <span className="text-base">{icon}</span>
      {label}
    </button>
  );
}
