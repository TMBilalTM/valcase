import Image from "next/image";
import type { ValorantContent } from "@/types/valorant";

interface DashboardProps {
  content: ValorantContent;
}

const sidebarNav = [
  "Dashboard",
  "Explore",
  "Analysis",
  "Weapons",
  "Agents",
  "Locations",
  "Favourites",
];

const friendList = [
  { name: "CyberCrew", status: "online" },
  { name: "EtherWolf", status: "online" },
  { name: "BlockMage", status: "away" },
  { name: "TokenTitan", status: "offline" },
];

const matchHistory = [
  { map: "Breeze", score: "13 - 6", result: "win" },
  { map: "Icebox", score: "11 - 13", result: "loss" },
  { map: "Breeze", score: "8 - 13", result: "loss" },
  { map: "Haven", score: "11 - 5", result: "win" },
];

export function ValorantDashboard({ content }: DashboardProps) {
  const topAgent = content.agents[0];
  const agentShowcase = content.agents.slice(1, 4);
  const mapShowcase = content.maps.slice(0, 3);
  const weaponShowcase = content.skins.slice(0, 3);

  return (
    <section className="rounded-[40px] border border-white/10 bg-[#05070f] p-6 shadow-[0_30px_80px_rgba(2,5,12,0.8)]">
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="rounded-3xl border border-white/5 bg-[#070a14] p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff4655] text-xs font-black">
              V
            </div>
            <span className="text-lg font-black uppercase tracking-tight text-white">Valcase</span>
          </div>
          <nav className="mt-8 space-y-2">
            {sidebarNav.map((label) => (
              <button
                key={label}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-white/60 transition hover:bg-white/5 hover:text-white ${label === "Dashboard" ? "bg-white/5 text-white" : ""}`}
              >
                <span>{label}</span>
                {label === "Dashboard" && <span className="h-2 w-2 rounded-full bg-[#ff4655]" />}
              </button>
            ))}
          </nav>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40">Rank</p>
            <p className="mt-2 text-sm font-bold text-white">Diamond I</p>
            <p className="text-xs text-white/60">Peak Rating</p>
          </div>
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40">Friends</p>
            <div className="mt-3 space-y-2 text-sm text-white/70">
              {friendList.map((friend) => (
                <div key={friend.name} className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-white/5">
                  <span>{friend.name}</span>
                  <span
                    className={`text-[11px] uppercase ${
                      friend.status === "online"
                        ? "text-emerald-300"
                        : friend.status === "away"
                        ? "text-amber-300"
                        : "text-white/40"
                    }`}
                  >
                    {friend.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-linear-to-br from-[#ff5c74] via-[#b948d0] to-[#492fc3] p-6 text-white">
              <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">Top Agent</p>
                  <h2 className="text-3xl font-black tracking-tight">{topAgent?.name ?? "Agent"}</h2>
                  <p className="text-sm text-white/80">Play Time 463H</p>
                  <div className="grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.2em]">
                    <div>
                      <p className="text-white/70">Headshot %</p>
                      <p className="text-lg font-bold">12.6</p>
                    </div>
                    <div>
                      <p className="text-white/70">Kill/R</p>
                      <p className="text-lg font-bold">3.2</p>
                    </div>
                    <div>
                      <p className="text-white/70">Damage/R</p>
                      <p className="text-lg font-bold">210.6</p>
                    </div>
                    <div>
                      <p className="text-white/70">Score/R</p>
                      <p className="text-lg font-bold">320.4</p>
                    </div>
                  </div>
                </div>
                {topAgent && (
                  <div className="relative h-48 w-44">
                    <Image src={topAgent.image} alt={topAgent.name} fill className="object-contain drop-shadow-2xl" />
                  </div>
                )}
              </div>
              <div className="absolute right-6 top-6 text-6xl font-black text-white/30">62%</div>
            </div>
            <div className="rounded-[30px] border border-white/10 bg-[#0b0f1d] p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">Tracker Score</p>
                  <p className="mt-1 text-3xl font-black">914 / 1000</p>
                </div>
                <div className="rounded-2xl border border-[#00f0ff]/40 bg-[#00f0ff]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.4em] text-[#00f0ff]">
                  Live
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40">Last Match</p>
                <div className="space-y-2">
                  {matchHistory.map((match) => (
                    <div key={match.map + match.score} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-3 py-2 text-sm">
                      <span className="text-white/80">{match.map}</span>
                      <span className={match.result === "win" ? "text-emerald-300" : "text-[#ff8181]"}>{match.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="rounded-[30px] border border-white/10 bg-[#080b16] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40">Agents</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {agentShowcase.map((agent) => (
                  <div key={agent.uuid} className="overflow-hidden rounded-3xl border border-white/10 bg-[#0f1923]">
                    <div className="relative h-40">
                      <Image src={agent.image} alt={agent.name} fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <p className="text-lg font-black uppercase text-white">{agent.name}</p>
                      <p className="text-xs font-semibold text-[#ff4655]">{agent.role ?? "Agent"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[30px] border border-white/10 bg-[#080b16] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40">Top Weapons</p>
              <div className="mt-4 space-y-3">
                {weaponShowcase.map((weapon) => (
                  <div key={weapon.uuid} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0f1923] p-3">
                    <div className="relative h-14 w-24">
                      <Image src={weapon.image} alt={weapon.name} fill className="object-contain" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{weapon.name}</p>
                      <p className="text-xs text-white/60">{weapon.weapon ?? "Weapon"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[#080b16] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40">Top Maps</p>
                <p className="text-sm text-white/60">Win rate verileri ile</p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">View all</span>
            </div>
            <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {mapShowcase.map((map) => (
                <div key={map.uuid} className="overflow-hidden rounded-3xl border border-white/10 bg-[#0f1923]">
                  <div className="relative h-36">
                    <Image src={map.image} alt={map.name} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="text-lg font-black text-white">{map.name}</p>
                    <p className="text-xs text-white/60">99% win rate</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
