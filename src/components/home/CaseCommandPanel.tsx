import Link from "next/link";
import { CASES } from "@/data/cases";
import { formatCurrency } from "@/lib/utils";

const featuredCases = CASES.slice(0, 3);

export function CaseCommandPanel() {
  return (
    <section className="rounded-4xl border border-white/10 bg-[#05070d] px-8 py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.4em] text-white/50">Seçili Kasalar</p>
          <h3 className="text-3xl font-black text-white">Hemen Açabileceğin Paketler</h3>
          <p className="text-sm text-white/60">Her biri sade tasarım, net ödül havuzu ve güncel Valorant teması ile hazır.</p>
        </div>
        <Link href="#cases" className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ff4655]">
          Kasalara Git
        </Link>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {featuredCases.map((caseDef) => (
          <div key={caseDef.id} className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-white/50">
              <span>{caseDef.badge ?? "VALCASE"}</span>
              <span className="text-white/70">{caseDef.lootTable.length} Drop</span>
            </div>
            <h4 className="mt-4 text-xl font-black text-white">{caseDef.title}</h4>
            <p className="mt-2 flex-1 text-sm text-white/60">{caseDef.description}</p>
            <div className="mt-6 flex items-center justify-between text-sm font-semibold text-white">
              <span>{formatCurrency(caseDef.price)} VP</span>
              <span className="text-[#ff4655]">Aç</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
