import Link from "next/link";

import { VideoText } from "@/registry/magicui/video-text";

const heroStats = [
  { label: "Açılan Kasa", value: "1.2M+" },
  { label: "Canlı Drop", value: "24" },
  { label: "Aktif Koleksiyon", value: "08" },
];

const heroHighlights = [
  { title: "Radiant Frontier", note: "Mythic rotasyon aktif" },
  { title: "Protocol Vault", note: "Dengeli ödül havuzu" },
  { title: "Omega Archive", note: "Lore odaklı ganimet" },
];

const heroVideo = {
  src: "https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt0e640f7f4b0f8434/5e8c6dee5d90243ce318b1aa/VALORANT_Duelists.mp4",
  poster: "https://i.ytimg.com/vi/e_E9W2vsRbQ/maxresdefault.jpg",
};

export function ValHero() {
  return (
    <section className="relative overflow-hidden rounded-4xl border border-white/15 text-white">
      <div className="absolute inset-0 -z-10">
        <VideoText src={heroVideo.src} poster={heroVideo.poster} className="h-full rounded-none opacity-80">
          VALORANT PRIME
        </VideoText>
      </div>

      <div className="relative z-10 space-y-8 px-6 py-12 backdrop-blur-2xl sm:px-12 sm:py-16">
        <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.45em] text-white/70">
          <span className="inline-flex items-center rounded-full bg-[#ff4655] px-4 py-1 text-[9px] tracking-[0.5em] text-white">
            CANLI
          </span>
          <span>Valorant Sinematik Kasa Deneyimi</span>
          <span className="text-white/40">Episode 08 · Reactor Field</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-[11px] font-black uppercase tracking-[0.5em] text-white/60">Valcase · Prime Broadcast</p>
              <h1 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">
                Valorant kasalarını canlı aç, koleksiyon oluştur
              </h1>
              <p className="max-w-2xl text-base text-white/80">
                Valcase, Prime kasalarını gerçek drop oranlarıyla açmanı sağlar; anlık ödül akışı, profil ilerlemesi ve kasa
                istatistikleri tek panelde birleşir. Blur katmanlı hero, video arka plana rağmen kasa içeriğini net tutar.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="#cases"
                className="inline-flex items-center justify-center rounded-full bg-[#ff4655] px-8 py-3 text-xs font-black uppercase tracking-[0.4em] transition hover:bg-[#ff4655]/90"
              >
                Kasa Aç
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-3 text-xs font-black uppercase tracking-[0.4em] text-white/80 transition hover:text-white"
              >
                Profilim
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-white/20 bg-black/40 px-5 py-4">
                  <p className="text-[9px] uppercase tracking-[0.6em] text-white/50">{stat.label}</p>
                  <p className="mt-2 text-3xl font-black">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5 rounded-3xl border border-white/20 bg-black/45 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.45em] text-white/50">Şu An Yayında</p>
                <p className="text-2xl font-black">Valorant · Duelists</p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00f0ff]">HDR FEED</span>
            </div>
            <p className="text-sm text-white/75">
              Hero arka planı Riot&apos;un &ldquo;Duelists&rdquo; sinematiğinden beslenir. Yüzey mat bir cam panel gibi davranarak içerik kutularını öne çıkarır.
            </p>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">Now Playing</p>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-base font-semibold">Duelists Cinematic</p>
                  <p className="text-xs text-white/60">02:26 · Riot Games</p>
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">4K</span>
              </div>
            </div>

            <div className="space-y-3">
              {heroHighlights.map((highlight) => (
                <div key={highlight.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/60 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold">{highlight.title}</p>
                    <p className="text-xs text-white/60">{highlight.note}</p>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">VAL</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
