import { getUserProfile } from "@/lib/profile";
import { ProfileDashboard } from "@/components/profile/ProfileDashboard";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";

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
    <div className="space-y-8">
      <section className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Profil</p>
        <h1 className="text-4xl font-semibold text-white">Kişisel kasalarını yönet</h1>
        <p className="text-sm text-white/60">Bakiyeni, kazandığın ödülleri ve envanterini Mongo Atlas üzerinde saklıyoruz.</p>
      </section>
      <ProfileDashboard profile={profile} />
    </div>
  );
}
