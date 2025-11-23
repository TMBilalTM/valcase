import Link from "next/link";
import { GlassPanel } from "@/components/ui/panel";
import { formatCurrency } from "@/lib/utils";
import type { UserProfile } from "@/types/profile";

interface Props {
  profile: UserProfile;
}

export function ProfileDashboard({ profile }: Props) {
  const totalOpened = profile.totalOpened ?? 0;
  const level = Math.max(1, Math.floor(totalOpened / 25) + 1);
  const progress = ((totalOpened % 25) / 25) * 100;
  const inventoryPreview = profile.inventory.slice(0, 4);
  const recentRewards = profile.recentRewards.slice(0, 5);

  return (
    <div className="space-y-10">
      <div className="grid gap-6 xl:grid-cols-[2fr,1fr]">
        <GlassPanel className="relative overflow-hidden bg-[#0c111d]/80">
          <div className="pointer-events-none absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.08) 10%, transparent 10%)", backgroundSize: "18px 18px" }} />
          <div className="relative flex flex-col gap-8">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">Operasyon Özeti</p>
                <h2 className="text-2xl font-black uppercase tracking-tight text-white">Valorant Protokolü</h2>
                <p className="text-xs text-white/50">{new Date(profile.updatedAt).toLocaleString("tr-TR")} tarihinde senkronlandı.</p>
              </div>
              <div className="flex flex-wrap gap-4 text-white">
                {[{
                  label: "Bakiye",
                  value: `${formatCurrency(profile.balance)} VP`,
                  tone: "from-[#ff4655]/40 to-transparent"
                }, {
                  label: "Toplam Kasa",
                  value: totalOpened.toString(),
                  tone: "from-[#00f0ff]/30 to-transparent"
                }, {
                  label: "Envanter",
                  value: `${profile.inventory.length} Öge`,
                  tone: "from-[#f4c95d]/30 to-transparent"
                }].map((stat) => (
                  <div
                    key={stat.label}
                    className={`min-w-[150px] rounded-2xl border border-white/10 bg-linear-to-br ${stat.tone} px-4 py-3`}
                  >
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/60">{stat.label}</p>
                    <p className="mt-1 text-lg font-semibold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
                <span>Ajan Seviyesi</span>
                <span>Seviye {level}</span>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                <div className="h-2 rounded-full bg-linear-to-r from-[#ff4655] via-[#ff6b7d] to-[#ffd166]" style={{ width: `${Math.min(progress, 100)}%` }} />
              </div>
              <p className="mt-2 text-[11px] text-white/50">
                {totalOpened % 25} / 25 XP (her 25 kasa açılışında yeni bir ajan seviyesi kazanırsın)
              </p>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="relative overflow-hidden bg-[#111827]/80">
          <div className="absolute -right-8 -top-8 h-32 w-32 rotate-45 border border-white/10" />
          <div className="absolute bottom-0 right-0 h-24 w-24 bg-[#ff4655]/20 blur-3xl" />
          <div className="relative space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">Favori Ajan</p>
              <h3 className="mt-2 text-3xl font-black text-white">
                {profile.favoriteAgent ?? "Belirlenmedi"}
              </h3>
              <p className="text-sm text-white/60">Kasalardan gelen drop&apos;lar ile ajan tercihlerini güncel tut.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/50">Taktik Notu</p>
              <p className="mt-2 text-sm text-white/80">
                Operasyon hattı aktif. Gündelik kasalarla {profile.username} için özel skin rotasyonu oluşturuldu.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="rounded-full border border-[#ff4655]/40 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-white transition hover:bg-[#ff4655]/20">
                Yeni Kasa Aç
              </Link>
              <Link href="/profile" className="rounded-full border border-white/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/70 transition hover:text-white">
                Drop Günlüğü
              </Link>
            </div>
          </div>
        </GlassPanel>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassPanel className="bg-[#0c111d]/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">Son Kazanımlar</p>
              <p className="text-sm text-white/50">Operasyon günlüğün kronolojik olarak listelenir.</p>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00f0ff]">
              {recentRewards.length} kayıt
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {recentRewards.length === 0 ? (
              <p className="text-sm text-white/60">Henüz drop kazanmadın. İlk kasanı açarak başla.</p>
            ) : (
              recentRewards.map((reward) => (
                <div
                  key={`${reward.uuid}-${reward.acquiredAt}`}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">{reward.name}</p>
                    <p className="text-xs text-white/50">{reward.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-emerald-300">{formatCurrency(reward.value)} VP</p>
                    <p className="text-xs text-white/40">{new Date(reward.acquiredAt).toLocaleDateString("tr-TR")}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </GlassPanel>

        <GlassPanel className="bg-[#0c111d]/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">Envanter Önizleme</p>
              <p className="text-sm text-white/50">Sadece son dört drop gösterilir.</p>
            </div>
            <Link href="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff4655]">
              Tamamını Gör
            </Link>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {inventoryPreview.length === 0 ? (
              <p className="text-sm text-white/60">Kasan açılmayı bekliyor. Stokta öge yok.</p>
            ) : (
              inventoryPreview.map((item) => (
                <div key={`${item.uuid}-${item.acquiredAt}`} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">{item.category}</span>
                  </div>
                  <p className="mt-3 text-base font-bold text-emerald-300">{formatCurrency(item.value)} VP</p>
                  <p className="text-[10px] text-white/40">{new Date(item.acquiredAt).toLocaleDateString("tr-TR")}</p>
                </div>
              ))
            )}
          </div>
        </GlassPanel>
      </div>

      <GlassPanel className="relative overflow-hidden bg-[#0c111d]/80">
        <div className="absolute inset-0 border border-dashed border-white/10" />
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">Operasyon Talimatı</p>
            <p className="text-sm text-white/60">Drop verilerini Mongo Atlas üzerinde saklıyor, eş zamanlı senkron ediyoruz.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-full border border-white/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/70 transition hover:text-white">
              Destek Merkezi
            </Link>
            <Link href="/" className="rounded-full border border-[#00f0ff]/40 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#00f0ff]">
              Operasyon Logları
            </Link>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
