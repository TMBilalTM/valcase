import { getBalanceAction } from "@/app/actions";
import { CaseExperience } from "@/components/cases/CaseExperience";
import { CASES } from "@/data/cases";
import { getValorantContent } from "@/lib/valorant-api";
import { formatCurrency } from "@/lib/utils";

export default async function CasesPage() {
  const [content, balance] = await Promise.all([
    getValorantContent(),
    getBalanceAction(),
  ]);

  const spotlightCases = CASES.slice(0, 3);
  const specialtyCases = CASES.filter((item) => item.badge).slice(0, 2);
  const categoryTokens = Array.from(new Set(CASES.flatMap((item) => item.featured))).slice(0, 6);

  return (
    <div className="space-y-12 pb-16">
      <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-[#04060c] via-[#0a0f1f] to-[#06090f] p-6 text-white sm:p-10">
        <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,70,85,0.3), transparent 45%)" }} />
        <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(120deg, rgba(255,255,255,0.05) 30%, transparent 30%)", backgroundSize: "40px 40px" }} />
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-[11px] font-black uppercase tracking-[0.5em] text-white/60">Valcase Operasyon Alanı</p>
              <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">Spesifik kasalar, canlı loot ekonomisi</h1>
              <p className="max-w-2xl text-sm text-white/70">
                Güncellenen kasa havuzu; ajan rolleri, e-spor bannerları ve Operator sınıfı silahlara özel seçenekler sunar. Her kasa
                Valorant API verisiyle eşleşir, açılış animasyonlarıyla premium deneyim verir.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-white/70">
              {categoryTokens.map((token) => (
                <span key={token} className="rounded-full border border-white/15 px-4 py-1 text-white/80">
                  {token}
                </span>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">Aktif kasa</p>
                <p className="text-3xl font-black uppercase text-white">{CASES.length}</p>
                <p className="text-xs text-white/50">Özel kurgulanmış koleksiyon</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">VP bakiyesi</p>
                <p className="text-3xl font-black uppercase text-white">{formatCurrency(balance)}</p>
                <p className="text-xs text-white/50">Açılışa hazır</p>
              </div>
            </div>
          </div>
          <div className="space-y-4 rounded-3xl border border-white/10 bg-black/40 p-5">
            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.4em] text-white/60">
              <span>Spotlight kasalar</span>
              <span>Canlı fiyat</span>
            </div>
            <div className="space-y-4">
              {spotlightCases.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/40 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-white">{item.title}</p>
                    <p className="text-xs text-white/50">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-white">{formatCurrency(item.price)} VP</p>
                    <p className="text-[10px] uppercase tracking-[0.5em] text-white/40">{item.badge ?? "Stok"}</p>
                  </div>
                </div>
              ))}
            </div>
            {specialtyCases.length ? (
              <div className="flex flex-wrap gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/60">
                {specialtyCases.map((item) => (
                  <span key={item.id} className="rounded-full border border-white/20 px-3 py-1 text-white">
                    {item.badge} · {item.title}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <CaseExperience content={content} initialBalance={balance} />
    </div>
  );
}
