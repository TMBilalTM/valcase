import { cache } from "react";
import type {
  AgentSummary,
  GradientStops,
  LevelBorderSummary,
  MapSummary,
  PlayerCardSummary,
  SkinSummary,
  ValorantContent,
} from "@/types/valorant";

const API_BASE = "https://valorant-api.com";

interface ValorantResponse<T> {
  status: number;
  data: T;
}

interface WeaponSkin {
  uuid: string;
  displayName: string;
  contentTierUuid?: string;
  levels?: Array<{ displayIcon?: string; streamedVideo?: string }>;
  assetPath?: string;
}

interface AgentRaw {
  uuid: string;
  displayName: string;
  description?: string;
  role?: { displayName: string };
  fullPortrait?: string;
  background?: string;
  backgroundGradientColors?: string[];
}

interface MapRaw {
  uuid: string;
  displayName: string;
  coordinates?: string;
  narrativeDescription?: string;
  callouts?: Array<unknown>;
  splash?: string;
}

interface PlayerCardRaw {
  uuid: string;
  displayName: string;
  largeArt?: string;
  wideArt?: string;
  themeUuid?: string;
}

interface LevelBorderRaw {
  uuid: string;
  displayName: string;
  startingLevel: number;
  levelNumberAppearance?: string;
  smallPlayerCardAppearance?: string;
}

const RARITY_META: Record<
  string,
  { label: string; multiplier: number; accent: string }
> = {
  "0cebb8be-46d7-c12a-d306-e9907bfc5a25": {
    label: "Select",
    multiplier: 1,
    accent: "#76a9ff",
  },
  "60bca009-4182-7998-dee7-b8a2558dc369": {
    label: "Deluxe",
    multiplier: 1.15,
    accent: "#5de4c7",
  },
  "e046854e-406c-37f4-6607-19a9ba8426fc": {
    label: "Premium",
    multiplier: 1.35,
    accent: "#fbd38d",
  },
  "f7caa9f7-4985-547f-8094-ff9b3df5d9b1": {
    label: "Exclusive",
    multiplier: 1.65,
    accent: "#f989c2",
  },
  "60bcb54b-40d5-ff11-9dfb-46621459f570": {
    label: "Ultra",
    multiplier: 1.9,
    accent: "#c778ff",
  },
};

async function fetchFromApi<T>(path: string, query?: Record<string, string>) {
  const normalizedPath = path.startsWith("/v1")
    ? path
    : `/v1${path.startsWith("/") ? path : `/${path}`}`;
  const url = new URL(normalizedPath, API_BASE);
  if (query) {
    Object.entries(query).forEach(([key, value]) => url.searchParams.set(key, value));
  }

  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    console.warn(`Valorant API error: ${response.status} ${url}`);
    return null;
  }

  const payload = (await response.json()) as ValorantResponse<T>;
  return payload.data;
}

function mapSkin(raw: WeaponSkin): SkinSummary | null {
  const image = raw.levels?.[0]?.displayIcon;
  if (!image) return null;

  const rarity = raw.contentTierUuid ? RARITY_META[raw.contentTierUuid] : undefined;

  return {
    uuid: raw.uuid,
    name: raw.displayName,
    subtitle: raw.assetPath?.split("/").at(-1)?.replaceAll("_", " "),
    image,
    accentColor: rarity?.accent ?? "#5de4c7",
    rarityLabel: rarity?.label ?? "Standard",
    rarityMultiplier: rarity?.multiplier ?? 1,
    contentTier: raw.contentTierUuid,
    weapon: raw.displayName.split("::").at(0),
  };
}

function mapAgent(raw: AgentRaw): AgentSummary | null {
  if (!raw.fullPortrait) return null;
  return {
    uuid: raw.uuid,
    name: raw.displayName,
    description: raw.description,
    subtitle: raw.role?.displayName,
    image: raw.fullPortrait,
    background: raw.background,
    accentColor: "#f472b6",
    rarityLabel: "Mythic Agent",
    rarityMultiplier: 1.4,
    gradient: raw.backgroundGradientColors
      ? (raw.backgroundGradientColors.slice(0, 4) as GradientStops)
      : undefined,
    role: raw.role?.displayName,
  };
}

function mapMap(raw: MapRaw): MapSummary | null {
  if (!raw.splash) return null;
  return {
    uuid: raw.uuid,
    name: raw.displayName,
    subtitle: raw.coordinates,
    description: raw.narrativeDescription,
    image: raw.splash,
    accentColor: "#38bdf8",
    rarityLabel: "Signature Arena",
    rarityMultiplier: 1.2,
    callouts: raw.callouts?.length,
  };
}

function mapPlayerCard(raw: PlayerCardRaw): PlayerCardSummary | null {
  if (!raw.largeArt) return null;
  return {
    uuid: raw.uuid,
    name: raw.displayName,
    image: raw.largeArt,
    artWide: raw.wideArt,
    accentColor: "#c084fc",
    rarityLabel: "Playercard",
    rarityMultiplier: 0.9,
  };
}

function mapLevelBorder(raw: LevelBorderRaw): LevelBorderSummary | null {
  const image = raw.levelNumberAppearance ?? raw.smallPlayerCardAppearance;
  if (!image) return null;

  return {
    uuid: raw.uuid,
    name: raw.displayName,
    subtitle: `${raw.startingLevel}+ XP`,
    image,
    accentColor: "#7dd3fc",
    rarityLabel: "Account Border",
    rarityMultiplier: 0.8,
    levelNumber: raw.startingLevel,
    startingLevel: raw.startingLevel,
  };
}

async function getSkins() {
  const data = await fetchFromApi<WeaponSkin[]>("/weapons/skins");
  return (data ?? []).map(mapSkin).filter(Boolean) as SkinSummary[];
}

async function getAgents() {
  const data = await fetchFromApi<AgentRaw[]>("/agents", {
    isPlayableCharacter: "true",
  });
  return (data ?? []).map(mapAgent).filter(Boolean) as AgentSummary[];
}

async function getMaps() {
  const data = await fetchFromApi<MapRaw[]>("/maps");
  return (data ?? []).map(mapMap).filter(Boolean) as MapSummary[];
}

async function getPlayerCards() {
  const data = await fetchFromApi<PlayerCardRaw[]>("/playercards");
  return (data ?? []).map(mapPlayerCard).filter(Boolean) as PlayerCardSummary[];
}

async function getLevelBorders() {
  const data = await fetchFromApi<LevelBorderRaw[]>("/levelborders");
  return (data ?? []).map(mapLevelBorder).filter(Boolean) as LevelBorderSummary[];
}

export const getValorantContent = cache(async (): Promise<ValorantContent> => {
  const [skins, agents, maps, cards, borders] = await Promise.all([
    getSkins(),
    getAgents(),
    getMaps(),
    getPlayerCards(),
    getLevelBorders(),
  ]);

  return {
    skins,
    agents,
    maps,
    playerCards: cards,
    levelBorders: borders,
  };
});
