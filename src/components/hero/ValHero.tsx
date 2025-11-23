import Link from "next/link";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

const heroTiles = [
  {
    title: "Ajanlar",
    description: "Yeteneklerini Keşfet",
    body: "Her biri farklı yeteneklere sahip ajanlarla oyun tarzını belirle.",
    icon: <span className="text-xs font-bold text-[#ff4655]">ROLE</span>,
    footer: "Tüm Ajanlar",
  },
  {
    title: "Haritalar",
    description: "Savaş Alanları",
    body: "Dünyanın dört bir yanındaki arenalarda stratejini konuştur.",
    icon: <span className="text-xs font-bold text-[#ff4655]">MAP</span>,
    footer: "Bölgeleri İncele",
  },
  {
    title: "Arsenal",
    description: "Silah Koleksiyonu",
    body: "En nadir kaplamalar ve özel efektlerle silahlarını kişiselleştir.",
    icon: <span className="text-xs font-bold text-[#ff4655]">SKIN</span>,
    footer: "Vitrine Git",
  },
  {
    title: "Savaş Bileti",
    description: "Özel İçerikler",
    body: "Seviye atladıkça açılan özel kartlar, uğurlar ve spreyler.",
    icon: <span className="text-xs font-bold text-[#ff4655]">BP</span>,
    footer: "Ödülleri Gör",
  },
];

const snapshotStats = [
  { label: "Aktif Kasa", value: "3 Koleksiyon" },
  { label: "Toplam Ödül", value: "5 Kategori" },
  { label: "Oyuncu", value: "Global" },
  { label: "Erişim", value: "Herkese Açık" },
];

export function ValHero() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 border-l-4 border-[#ff4655] pl-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff4655]">ValCase Platformu</p>
        <h1 className="text-5xl font-black uppercase italic tracking-tighter text-white sm:text-7xl">
          SINIRLARI ZORLA.
        </h1>
        <p className="max-w-2xl text-lg font-medium text-white/80">
          ValCase ile Valorant evreninin en değerli parçalarına ulaş. Ajanlar, haritalar ve silah koleksiyonları seni bekliyor.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <SpotlightCard
          eyebrow="ÖZEL KOLEKSİYON"
          title="KASALARI AÇ VE KAZAN"
          description="Şansını dene, en nadir skinleri ve kozmetikleri koleksiyonuna ekle. Valorant dünyasının heyecanını burada yaşa."
          action={
            <div className="flex flex-wrap gap-4">
              <Link
                href="#cases"
                className="inline-flex items-center justify-center bg-[#ff4655] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#ff4655]/90"
              >
                ŞİMDİ OYNA
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center justify-center border border-white/40 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-black"
              >
                PROFİL
              </Link>
            </div>
          }
          className="min-h-80 rounded-none border-white/10 bg-[#0f1923]"
        />
        <div className="space-y-4">
          <BentoGrid className="md:grid-cols-2">
            {heroTiles.map((tile) => (
              <BentoGridItem 
                key={tile.title} 
                title={tile.title} 
                description={tile.description} 
                icon={tile.icon} 
                footer={tile.footer}
                className="rounded-none border-white/10 bg-[#0f1923]"
              >
                <p className="text-sm font-medium text-white/60">{tile.body}</p>
              </BentoGridItem>
            ))}
          </BentoGrid>
          <div className="grid gap-3 sm:grid-cols-2">
            {snapshotStats.map((stat) => (
              <div key={stat.label} className="border border-white/10 bg-[#0f1923] px-4 py-3 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff4655]">{stat.label}</p>
                <p className="text-xl font-black uppercase italic tracking-wider">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
