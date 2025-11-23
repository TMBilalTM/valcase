import type { CaseDefinition } from "@/types/valorant";

export const CASES: CaseDefinition[] = [
  {
    id: "radiant-frontier",
    title: "Radiant Frontier",
    description: "Valorant's most coveted weapon skins with premium odds.",
    price: 680,
    accent: "from-violet-500 via-fuchsia-500 to-orange-400",
    glow: "shadow-[0_0_60px_rgba(251,113,133,0.35)]",
    badge: "Hot",
    swatch: "#f472b6",
    featured: ["skins", "agents", "playerCards"],
    lootTable: [
      { pool: "skins", weight: 60, label: "Premium Skin", multiplier: 1.4 },
      { pool: "skins", weight: 20, label: "Ultra Skin", multiplier: 1.7 },
      { pool: "agents", weight: 12, label: "Agent Spotlight", multiplier: 1.35 },
      { pool: "playerCards", weight: 8, label: "Card Drop", multiplier: 1 },
    ],
  },
  {
    id: "protocol-vault",
    title: "Protocol Vault",
    description: "Balanced case mixing skins, maps, and borders for collectors.",
    price: 420,
    accent: "from-sky-500 via-cyan-400 to-emerald-400",
    glow: "shadow-[0_0_50px_rgba(14,165,233,0.4)]",
    swatch: "#38bdf8",
    featured: ["skins", "maps", "levelBorders"],
    lootTable: [
      { pool: "skins", weight: 40, label: "Weapon Skin", multiplier: 1.1 },
      { pool: "maps", weight: 25, label: "Map Showcase", multiplier: 1.25 },
      { pool: "levelBorders", weight: 20, label: "Border", multiplier: 0.95 },
      { pool: "playerCards", weight: 15, label: "Player Card", multiplier: 1 },
    ],
  },
  {
    id: "omega-archive",
    title: "Omega Archive",
    description: "Lore-heavy pulls focused on agents, maps, and cinematic cards.",
    price: 540,
    accent: "from-rose-500 via-purple-500 to-blue-500",
    glow: "shadow-[0_0_45px_rgba(244,63,94,0.35)]",
    badge: "New",
    swatch: "#c084fc",
    featured: ["agents", "maps", "playerCards"],
    lootTable: [
      { pool: "agents", weight: 35, label: "Featured Agent", multiplier: 1.4 },
      { pool: "maps", weight: 30, label: "Mythic Arena", multiplier: 1.3 },
      { pool: "playerCards", weight: 20, label: "Cinematic Card", multiplier: 1.1 },
      { pool: "levelBorders", weight: 15, label: "Ascendant Border", multiplier: 1.05 },
    ],
  },
];

export const CASE_LOOKUP = Object.fromEntries(CASES.map((item) => [item.id, item]));
