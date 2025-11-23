import type { CaseDefinition, CasePool, CaseReward, ValorantContent } from "@/types/valorant";
import { formatCurrency, pickWeightedItem, randomBetween } from "@/lib/utils";

const BASE_VALUES: Record<CasePool, number> = {
  skins: 750,
  agents: 1100,
  maps: 520,
  playerCards: 260,
  levelBorders: 220,
};

function pickPoolEntry(pool: CasePool, content: ValorantContent) {
  const entries = content[pool];
  if (!entries?.length) return null;
  return entries[Math.floor(Math.random() * entries.length)];
}

export function openCase(caseDef: CaseDefinition, content: ValorantContent): CaseReward | null {
  const loot = pickWeightedItem(caseDef.lootTable.map((entry) => ({
    weight: entry.weight,
    value: entry,
  })));

  if (!loot) return null;

  const selection = pickPoolEntry(loot.pool, content);
  if (!selection) return null;

  const base = BASE_VALUES[loot.pool];
  const rarityBoost = selection.rarityMultiplier ?? 1;
  const poolValue = base * loot.multiplier * rarityBoost;

  const houseEdge = caseDef.price * 0.9; // çoğu durumda hafif zarar
  const blended = poolValue * 0.65 + houseEdge * 0.35;
  const variance = randomBetween(0.85, 1.35);

  let value = Math.round(blended * variance);
  const minValue = Math.round(caseDef.price * 0.45);
  const maxValue = Math.round(caseDef.price * 2.2);
  value = Math.min(Math.max(value, minValue), maxValue);

  return {
    caseId: caseDef.id,
    caseTitle: caseDef.title,
    category: loot.pool,
    uuid: selection.uuid,
    name: selection.name,
    subtitle: selection.subtitle ?? selection.description,
    image: selection.image,
    accentColor: selection.accentColor,
    rarityLabel: selection.rarityLabel,
    value,
    detail: formatCurrency(value - caseDef.price),
  };
}
