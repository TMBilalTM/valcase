import { getValorantContent } from "@/lib/valorant-api";
import { ValHero } from "@/components/hero/ValHero";
import { CaseExperience } from "@/components/cases/CaseExperience";
import { ValorantSpotlight } from "@/components/content/ValorantSpotlight";
import { CategoryDock } from "@/components/content/CategoryDock";
import { getSessionId } from "@/app/actions";
import { getUserProfile } from "@/lib/profile";

export default async function Home() {
  const content = await getValorantContent();
  const sessionId = await getSessionId();
  const profile = sessionId ? await getUserProfile(sessionId) : null;

  return (
    <div className="space-y-16">
      <ValHero />
      <CategoryDock />
      <CaseExperience content={content} initialBalance={profile?.balance ?? 0} />
      <ValorantSpotlight content={content} />
    </div>
  );
}
