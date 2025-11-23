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
  const value = Math.round(base * loot.multiplier * rarityBoost * randomBetween(0.9, 1.25));

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
