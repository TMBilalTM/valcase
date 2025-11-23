import type { CaseDefinition } from "@/types/valorant";
import { CaseCard } from "@/components/cases/CaseCard";

interface CaseGridProps {
  cases: CaseDefinition[];
  onOpen: (caseId: string) => void;
  balance: number;
}

export function CaseGrid({ cases, onOpen, balance }: CaseGridProps) {
  return (
    <section id="cases" className="space-y-6">
      <div className="border-l-4 border-[#ff4655] pl-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff4655]">KOLEKSİYONLAR</p>
        <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white sm:text-5xl">ÖZEL KASALAR</h2>
        <p className="text-lg font-medium text-white/60">MEVCUT BAKİYE: <span className="text-white">{balance.toLocaleString("tr-TR")} VP</span></p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((item) => (
          <CaseCard key={item.id} data={item} onOpen={onOpen} disabled={balance < item.price} />
        ))}
      </div>
    </section>
  );
}
