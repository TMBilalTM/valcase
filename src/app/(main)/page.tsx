import { ValHero } from "@/components/hero/ValHero";
import { getValorantContent } from "@/lib/valorant-api";

export default async function Home() {
  await getValorantContent();

  return (
    <div className="space-y-12 pb-16">
      <ValHero />
    </div>
  );
}
