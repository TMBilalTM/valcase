import type { CaseDefinition } from "@/types/valorant";
import { CaseCard } from "@/components/cases/CaseCard";

interface CaseGridProps {
  cases: CaseDefinition[];
  onOpen: (caseId: string, count?: 1 | 5 | 10) => void;
  balance: number;
}

export function CaseGrid({ cases, onOpen, balance }: CaseGridProps) {
  const featureTags = Array.from(new Set(cases.flatMap((item) => item.featured))).slice(0, 8);

  return (
    <section id="cases" className="space-y-6">
      <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="border-l-4 border-[#ff4655] pl-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff4655]">KOLEKSİYONLAR</p>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white sm:text-5xl">ÖZEL KASALAR</h2>
          <p className="text-lg font-medium text-white/60">
            MEVCUT BAKİYE: <span className="text-white">{balance.toLocaleString("tr-TR")} VP</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.4em] text-white/60">
          {featureTags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-white/80">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="-mx-4 flex gap-4 overflow-x-auto pb-4 sm:hidden" data-marquee="pause">
        {cases.map((item) => (
          <div key={item.id} className="w-[280px] shrink-0 px-4">
            <CaseCard data={item} onOpen={onOpen} disabled={balance < item.price} />
          </div>
        ))}
      </div>
      <div className="hidden gap-6 sm:grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {cases.map((item) => (
          <CaseCard key={item.id} data={item} onOpen={onOpen} disabled={balance < item.price} />
        ))}
      </div>
    </section>
  );
}
