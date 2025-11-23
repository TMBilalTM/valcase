import Image from "next/image";
import type { ValorantContent } from "@/types/valorant";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

interface Props {
  content: ValorantContent;
}

export function ValorantSpotlight({ content }: Props) {
  const agents = content.agents.slice(0, 3);
  const maps = content.maps.slice(0, 2);
  const cards = content.playerCards.slice(0, 3);
  const borders = content.levelBorders.slice(0, 3);

  return (
    <section id="content" className="space-y-6">
      <div className="border-l-4 border-[#ff4655] pl-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff4655]">OYUN İÇERİĞİ</p>
        <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white sm:text-5xl">
          AJANLAR VE ARENALAR
        </h2>
        <p className="max-w-2xl text-lg font-medium text-white/80">
          Valorant dünyasının en ikonik karakterleri ve savaş alanları. Stratejini belirle, takımını kur ve zafere ulaş.
        </p>
      </div>

      <BentoGrid className="md:grid-cols-2 lg:grid-cols-3">
        <BentoGridItem
          title="AJANLAR"
          description="TAKIMINI SEÇ"
          icon={<span className="text-xs font-bold text-[#ff4655]">ROLE</span>}
          footer="Tüm Roller: Kontrol, Düellocu, Gözcü"
          className="rounded-none border-white/10 bg-[#0f1923]"
        >
          <div className="mt-4 space-y-3">
            {agents.map((agent) => (
              <div key={agent.uuid} className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden border border-white/10 bg-[#ece8e1]/10">
                  <Image src={agent.image} alt={agent.name} fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase text-white">{agent.name}</p>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#ff4655]">{agent.role}</p>
                </div>
              </div>
            ))}
          </div>
        </BentoGridItem>

        <BentoGridItem
          title="HARİTALAR"
          description="SAVAŞ ALANLARI"
          icon={<span className="text-xs font-bold text-[#ff4655]">MAP</span>}
          footer="Taktiksel Konumlar"
          className="lg:col-span-2 rounded-none border-white/10 bg-[#0f1923]"
        >
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {maps.map((map) => (
              <div key={map.uuid} className="overflow-hidden border border-white/10 bg-[#ece8e1]/5">
                <Image src={map.image} alt={map.name} width={640} height={320} className="h-40 w-full object-cover opacity-80 transition hover:opacity-100" />
                <div className="p-4">
                  <p className="text-lg font-black uppercase italic text-white">{map.name}</p>
                  <p className="text-xs font-medium text-white/60">{map.description?.slice(0, 110) ?? "Gizli Bölge"}</p>
                </div>
              </div>
            ))}
          </div>
        </BentoGridItem>

        <BentoGridItem
          title="KARTLAR"
          description="OYUNCU KİMLİĞİ"
          icon={<span className="text-xs font-bold text-[#ff4655]">CRD</span>}
          footer="Nadir Koleksiyonlar"
          className="rounded-none border-white/10 bg-[#0f1923]"
        >
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {cards.map((card) => (
              <div key={card.uuid} className="overflow-hidden border border-white/10 bg-[#ece8e1]/5 transition hover:scale-105">
                <Image src={card.image} alt={card.name} width={400} height={600} className="h-40 w-full object-cover" />
                <div className="bg-[#0f1923] p-2">
                  <p className="truncate text-xs font-bold uppercase text-white">{card.name}</p>
                </div>
              </div>
            ))}
          </div>
        </BentoGridItem>

        <BentoGridItem
          title="ÇERÇEVELER"
          description="SEVİYE GÖSTERGESİ"
          icon={<span className="text-xs font-bold text-[#ff4655]">BDR</span>}
          footer="Prestij Rozetleri"
          className="rounded-none border-white/10 bg-[#0f1923]"
        >
          <div className="mt-4 space-y-3">
            {borders.map((border) => (
              <div key={border.uuid} className="flex items-center gap-4 border border-white/10 bg-[#ece8e1]/5 px-3 py-2">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden">
                  <Image src={border.image} alt={border.name} fill sizes="48px" className="object-contain" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase text-white">{border.name}</p>
                  <p className="text-xs font-medium text-white/60">{border.startingLevel}+ SEVİYE</p>
                </div>
              </div>
            ))}
          </div>
        </BentoGridItem>
      </BentoGrid>
    </section>
  );
}
