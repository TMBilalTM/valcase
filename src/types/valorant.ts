export type GradientStops = [string, string, string, string?];

export interface BaseContentSummary {
  uuid: string;
  name: string;
  subtitle?: string;
  description?: string;
  image: string;
  background?: string;
  accentColor: string;
  rarityLabel: string;
  rarityMultiplier: number;
}

export interface SkinSummary extends BaseContentSummary {
  weapon?: string;
  contentTier?: string;
}

export interface AgentSummary extends BaseContentSummary {
  role?: string;
  gradient?: GradientStops;
}

export interface MapSummary extends BaseContentSummary {
  callouts?: number;
}

export interface PlayerCardSummary extends BaseContentSummary {
  artWide?: string;
}

export interface LevelBorderSummary extends BaseContentSummary {
  levelNumber: number;
  startingLevel: number;
}

export interface ValorantContent {
  skins: SkinSummary[];
  agents: AgentSummary[];
  maps: MapSummary[];
  playerCards: PlayerCardSummary[];
  levelBorders: LevelBorderSummary[];
}

export type CasePool = keyof Pick<
  ValorantContent,
  "skins" | "agents" | "maps" | "playerCards" | "levelBorders"
>;

export interface CaseLootEntry {
  pool: CasePool;
  weight: number;
  label: string;
  multiplier: number;
}

export interface CaseDefinition {
  id: string;
  title: string;
  description: string;
  price: number;
  accent: string;
  glow: string;
  badge?: string;
  swatch?: string;
  featured: string[];
  lootTable: CaseLootEntry[];
}

export interface CaseReward {
  caseId: string;
  caseTitle: string;
  category: CasePool;
  uuid: string;
  name: string;
  subtitle?: string;
  image: string;
  accentColor: string;
  rarityLabel: string;
  value: number;
  detail?: string;
}
