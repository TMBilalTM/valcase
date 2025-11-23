import { GlassPanel } from "@/components/ui/panel";
import type { UserProfile } from "@/types/profile";

interface Props {
  profile: UserProfile;
}

export function ProfileDashboard({ profile }: Props) {
  return (
    <div className="space-y-8">
      <GlassPanel className="bg-slate-900/60">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Profil</p>
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">{profile.username}</h1>
            <p className="text-sm text-white/60">Güncellendi: {new Date(profile.updatedAt).toLocaleString("tr-TR")}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center text-white">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Bakiye</p>
              <p className="text-2xl font-semibold">{profile.balance.toLocaleString("tr-TR")}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Açılan Kasa</p>
              <p className="text-2xl font-semibold">{profile.totalOpened}</p>
            </div>
          </div>
        </div>
      </GlassPanel>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassPanel className="bg-slate-900/60">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Son Kazanımlar</p>
          <div className="mt-4 space-y-3">
            {profile.recentRewards.length === 0 ? (
              <p className="text-sm text-white/60">Henüz veri yok.</p>
            ) : (
              profile.recentRewards.map((reward) => (
                <div key={`${reward.uuid}-${reward.acquiredAt}`} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{reward.name}</p>
                    <p className="text-xs text-white/60">{reward.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-emerald-300">{reward.value.toLocaleString("tr-TR")} VP</p>
                    <p className="text-xs text-white/50">{new Date(reward.acquiredAt).toLocaleDateString("tr-TR")}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </GlassPanel>

        <GlassPanel className="bg-slate-900/60">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">En Sevilen Ajan</p>
          <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-2xl font-semibold text-white">{profile.favoriteAgent ?? "Belirsiz"}</p>
            <p className="text-sm text-white/60">Favorini kasadan kazandıkça güncelle.</p>
          </div>
        </GlassPanel>
      </div>

      <GlassPanel className="bg-slate-900/60">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Envanter</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {profile.inventory.length === 0 ? (
            <p className="text-sm text-white/60">Envanter boş.</p>
          ) : (
            profile.inventory.map((item) => (
              <div key={`${item.uuid}-${item.acquiredAt}`} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-base font-semibold text-white">{item.name}</p>
                <p className="text-xs text-white/60">{item.category}</p>
                <p className="text-sm text-emerald-300">{item.value.toLocaleString("tr-TR")} VP</p>
              </div>
            ))
          )}
        </div>
      </GlassPanel>
    </div>
  );
}
