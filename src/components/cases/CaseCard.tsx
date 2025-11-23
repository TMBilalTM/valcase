import type { CaseDefinition } from "@/types/valorant";
import { formatCurrency } from "@/lib/utils";

interface Props {
  data: CaseDefinition;
  onOpen?: (caseId: string) => void;
  disabled?: boolean;
}

export function CaseCard({ data, onOpen, disabled }: Props) {
  return (
    <article className="group flex h-full flex-col gap-4 border border-white/10 bg-[#0f1923] p-5 text-white transition hover:border-[#ff4655]/50 hover:bg-[#ece8e1]/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="inline-flex h-8 w-8 items-center justify-center text-sm font-bold uppercase"
            style={{ backgroundColor: `${data.swatch ?? "#475569"}22`, color: data.swatch ?? "#94a3b8" }}
          >
            {data.title.charAt(0)}
          </span>
          <div>
            <h3 className="text-lg font-black uppercase italic tracking-wide">{data.title}</h3>
            <p className="text-xs font-medium text-white/50">{data.description}</p>
          </div>
        </div>
        {data.badge ? (
          <span className="bg-[#ff4655] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            {data.badge}
          </span>
        ) : null}
      </div>
      <div className="flex items-center justify-between border-t border-white/5 pt-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">FİYAT</p>
          <p className="text-2xl font-black italic tracking-tighter">{formatCurrency(data.price)}</p>
        </div>
        <button
          onClick={() => onOpen?.(data.id)}
          disabled={disabled}
          className="bg-white/10 px-6 py-2 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#ff4655] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {disabled ? "YETERSİZ" : "AÇ"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-white/60">
        {data.lootTable.map((loot) => (
          <span key={`${data.id}-${loot.pool}-${loot.label}`} className="border border-white/10 px-2 py-1 font-medium uppercase">
            {loot.label}
          </span>
        ))}
      </div>
    </article>
  );
}
