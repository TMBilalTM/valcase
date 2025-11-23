import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import AnimatedBeamMultipleOutputDemo from "@/registry/example/animated-beam-multiple-outputs";
import AnimatedListDemo from "@/registry/example/animated-list-demo";
import { BentoCard, BentoGrid } from "@/registry/magicui/bento-grid";
import { Marquee } from "@/registry/magicui/marquee";

const caseMarquee = [
  { name: "Radiant Frontier", detail: "Ultra %20 · ₺680" },
  { name: "Protocol Vault", detail: "Dengeli %55 · ₺420" },
  { name: "Omega Archive", detail: "Lore %35 · ₺540" },
  { name: "Prism Relay", detail: "Deluxe %48 · ₺360" },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "Kasalar",
    description: "Prime, Protocol ve Omega kasaları tek panelde.",
    href: "#cases",
    cta: "Kasaları aç",
    className: "col-span-full lg:col-span-2",
    background: (
      <Marquee
        pauseOnHover
        className="absolute inset-x-0 top-6 [mask-image:linear-gradient(to_top,transparent_35%,#000_100%)]"
      >
        {caseMarquee.map((item) => (
          <figure
            key={item.name}
            className={cn(
              "relative w-36 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4",
              "text-left text-xs text-white/70 shadow-[0_10px_30px_rgba(5,9,18,0.55)] transition duration-300",
              "hover:border-white/40 hover:text-white"
            )}
          >
            <figcaption className="text-sm font-semibold text-white">{item.name}</figcaption>
            <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-white/40">{item.detail}</p>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: BellIcon,
    name: "Canlı drop",
    description: "Son 4 kasa açılışı feed olarak akar.",
    href: "/profile",
    cta: "Feed'i takip et",
    className: "col-span-full lg:col-span-1",
    background: (
      <AnimatedListDemo className="absolute inset-x-0 top-4 h-[300px] w-full border-none bg-transparent [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]" />
    ),
  },
  {
    Icon: Share2Icon,
    name: "Ajan & skin eşleşmesi",
    description: "Spotlight ajanlarına göre skin havuzunu senkronize et.",
    href: "/docs",
    cta: "Algoritmayı gör",
    className: "col-span-full lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute inset-x-0 top-4 h-[280px] border-none bg-transparent [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Rotasyon takvimi",
    description: "Bir sonraki vitrin drop'unu planla.",
    href: "#rotasyon",
    cta: "Takvimi aç",
    className: "col-span-full lg:col-span-1",
    background: (
      <Calendar
        mode="single"
        selected={new Date()}
        className="absolute inset-x-0 top-6 scale-90 border border-white/10 bg-black/60 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
      />
    ),
  },
];

export function ValorantBentoShowcase() {
  return (
    <section className="rounded-4xl border border-white/10 bg-[#03050b] px-6 py-10 text-white sm:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-white/40">Valcase Bento Panel</p>
          <h2 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">Kasalar, ajanlar, skinler tek ızgarada</h2>
        </div>
        <p className="max-w-sm text-sm text-white/70">
          MagicUI Bento Grid ile kasaların drop bilgisi, ajan-skin eşleşmesi ve rotasyon takvimi aynı yüzeyde. Hover durumları
          canlı veri bileşenlerini tetikler.
        </p>
      </div>
      <div className="mt-8">
        <BentoGrid>
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
