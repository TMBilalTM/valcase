import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/profile";
import { ProfileDashboard } from "@/components/profile/ProfileDashboard";
import { verifyToken } from "@/lib/auth";
import { formatCurrency } from "@/lib/utils";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("valcase_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const payload = verifyToken(token) as any;
  if (!payload || !payload.userId) {
    redirect("/login");
  }

  const profile = await getUserProfile(payload.userId);

  if (!profile) {
    redirect("/login");
  }

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-linear-to-r from-[#0b0d16] via-[#111a2d] to-[#090b13] px-10 py-12 shadow-[0_30px_80px_rgba(8,8,12,0.6)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-10 top-1/2 h-72 w-72 -translate-y-1/2 rotate-45 bg-linear-to-br from-[#ff4655]/20 to-transparent blur-3xl" />
          <div className="absolute right-0 top-0 h-56 w-56 bg-[#00f0ff]/10 blur-[120px]" />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(120deg, rgba(255,255,255,0.05) 25%, transparent 25%)", backgroundSize: "24px 24px" }} />
        </div>

        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-white/40">Ajan Merkezi</p>
              <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-white lg:text-5xl">
                Hoş geldin, {profile.username}
              </h1>
            </div>
            <p className="max-w-xl text-sm text-white/70">
              VALCASE operasyon odası, Riot istemcisinin karanlık atmosferini bire bir taşıyor. Buradan bakiyeni, açtığın kasaları ve envanterindeki nadir drop&apos;ları yönetebilirsin.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-[#ff4655]/50 bg-[#ff4655]/80 px-6 py-3 text-xs font-black uppercase tracking-[0.3em] text-white transition hover:bg-[#ff4655]"
              >
                Kasalara Geri Dön
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-xs font-black uppercase tracking-[0.3em] text-white/80 transition hover:text-white"
              >
                Envanteri Yönet
              </Link>
            </div>
          </div>

          <div className="grid w-full max-w-md grid-cols-2 gap-4 text-white">
            <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/60">Bakiye</p>
              <p className="mt-2 text-3xl font-black tracking-tight text-white">
                {formatCurrency(profile.balance)}
              </p>
              <p className="text-xs text-white/50">VP hazır</p>
            </div>
            <div className="rounded-3xl border border-[#00f0ff]/30 bg-linear-to-br from-[#00f0ff]/20 to-transparent px-5 py-4">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#00f0ff]/80">Açılan Kasa</p>
              <p className="mt-2 text-3xl font-black tracking-tight text-white">{profile.totalOpened}</p>
              <p className="text-xs text-white/50">Operasyon tamamdı</p>
            </div>
            <div className="col-span-2 rounded-3xl border border-white/10 bg-black/30 px-5 py-4">
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/60">Son Senkron</p>
              <p className="mt-2 text-lg font-semibold text-white">
                {new Date(profile.updatedAt).toLocaleString("tr-TR")}
              </p>
              <p className="text-xs text-white/50">Mongo Atlas kayıtlarına işlendi</p>
            </div>
          </div>
        </div>
      </section>

      <ProfileDashboard profile={profile} />
    </div>
  );
}
