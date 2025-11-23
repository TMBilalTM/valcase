import { cn } from "@/lib/utils";

type CalendarMode = "single";

interface CalendarProps {
  selected?: Date;
  mode?: CalendarMode;
  className?: string;
}

const dayLabels = ["P", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"];

export function Calendar({ selected = new Date(), className }: CalendarProps) {
  const current = new Date(selected.getFullYear(), selected.getMonth(), 1);
  const monthName = current.toLocaleDateString("tr-TR", { month: "long" });
  const year = current.getFullYear();
  const firstWeekday = current.getDay();
  const daysInMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();

  const cells: Array<number | null> = [];
  for (let i = 0; i < firstWeekday; i += 1) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const highlightedDay = selected.getDate();
  const highlightedMonth = selected.getMonth();
  const highlightedYear = selected.getFullYear();

  return (
    <div className={cn("rounded-3xl border border-white/10 bg-black/60 p-4 text-white shadow-[0_10px_30px_rgba(2,6,23,0.45)]", className)}>
      <div className="flex items-baseline justify-between">
        <p className="text-base font-semibold capitalize">{monthName}</p>
        <span className="text-sm text-white/50">{year}</span>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-2 text-[10px] uppercase tracking-[0.5em] text-white/40">
        {dayLabels.map((label) => (
          <span key={label} className="text-center">
            {label}
          </span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-2 text-sm">
        {cells.map((day, index) => {
          const isHighlighted =
            day !== null &&
            highlightedDay === day &&
            highlightedMonth === current.getMonth() &&
            highlightedYear === current.getFullYear();

          return (
            <div
              key={`${day ?? "empty"}-${index}`}
              className={cn(
                "flex h-9 items-center justify-center rounded-xl border border-white/5 text-white/70",
                day === null && "border-transparent",
                isHighlighted && "border-[#ff4655] bg-[#ff4655]/20 text-white"
              )}
            >
              {day ?? ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}
