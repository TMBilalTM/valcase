import { CASES } from "@/data/cases";
import { formatCurrency } from "@/lib/utils";

const telemetry = CASES.map((caseDef) => ({
  id: caseDef.id,
  title: caseDef.title,
  price: caseDef.price,
  rarity: caseDef.lootTable[0]?.label ?? "Özel",
  accent: caseDef.swatch ?? "#ff4655",
}));

export function SystemsTicker() {
  const tickerItems = [...telemetry, ...telemetry];

  return (
    <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-[#04060c] px-6 py-4">
      <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "120px 100%" }} />
      <div className="relative flex min-w-[200%] gap-6 animate-ticker">
        {tickerItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex min-w-[220px] flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/50">{item.rarity}</p>
            <p className="text-sm font-semibold text-white">{item.title}</p>
            <p className="text-xs font-semibold" style={{ color: item.accent }}>
              {formatCurrency(item.price)} VP
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
