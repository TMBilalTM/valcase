"use server";

import { revalidatePath } from "next/cache";

import { getSessionId } from "@/app/actions";
import { CASES } from "@/data/cases";
import { openCase } from "@/lib/case-engine";
import { getValorantContent } from "@/lib/valorant-api";
import { addInventoryItem, getUserProfile, removeInventoryItems, updateUserBalance } from "@/lib/profile";
import type { InventoryItem } from "@/types/profile";

const matchesToken = (entry: InventoryItem, token: string) => {
  return (
    entry.instanceId === token ||
    entry.uuid === token ||
    `${entry.uuid}:${entry.acquiredAt}` === token
  );
};

export async function sellInventoryItemAction(itemToken: string) {
  const userId = await getSessionId();
  if (!userId) {
    return { error: "Lütfen giriş yap." };
  }

  const profile = await getUserProfile(userId);
  if (!profile) {
    return { error: "Profil bulunamadı." };
  }

  const item = profile.inventory.find((entry) => matchesToken(entry, itemToken));
  if (!item) {
    return { error: "Eşya bulunamadı." };
  }

  const saleValue = Math.max(50, Math.round(item.value * 0.8));
  const newBalance = profile.balance + saleValue;

  await Promise.all([
    removeInventoryItems(userId, [{ instanceId: item.instanceId, uuid: item.uuid, acquiredAt: item.acquiredAt }]),
    updateUserBalance(userId, newBalance),
  ]);

  revalidatePath("/profile");

  return {
    success: true,
    balance: newBalance,
    saleValue,
  };
}

export async function tradeInventoryItemsAction(itemTokens: string[]) {
  const uniqueIds = Array.from(new Set(itemTokens)).slice(0, 5);
  if (uniqueIds.length < 5) {
    return { error: "Takasa başlamak için 5 öge seçmelisin." };
  }

  const userId = await getSessionId();
  if (!userId) {
    return { error: "Lütfen giriş yap." };
  }

  const profile = await getUserProfile(userId);
  if (!profile) {
    return { error: "Profil bulunamadı." };
  }

  const selectedItems = uniqueIds
    .map((token) => profile.inventory.find((entry) => matchesToken(entry, token)))
    .filter((entry): entry is InventoryItem => Boolean(entry));

  if (selectedItems.length < 5) {
    return { error: "Seçilen ögeler envanterde bulunamadı." };
  }

  const tradeValue = selectedItems.reduce((sum, item) => sum + item.value, 0);
  const targetCasePrice = Math.max(200, tradeValue / 3);
  const sortedCases = [...CASES].sort((a, b) => a.price - b.price);

  const tradeCase = sortedCases.reduce((closest, current) => {
    if (current.price <= targetCasePrice) {
      return current;
    }
    return closest ?? current;
  }, undefined as typeof CASES[number] | undefined) ?? sortedCases.at(-1)!;

  const content = await getValorantContent();
  const reward = openCase(tradeCase, content);

  if (!reward) {
    return { error: "Takastan drop üretilemedi." };
  }

  const inventoryItem: InventoryItem = {
    uuid: reward.uuid,
    name: reward.name,
    category: reward.category,
    value: reward.value,
    image: reward.image,
    acquiredAt: new Date().toISOString(),
  };

  const removalTargets = selectedItems.map((item) => ({ instanceId: item.instanceId, uuid: item.uuid, acquiredAt: item.acquiredAt }));
  await removeInventoryItems(userId, removalTargets);
  await addInventoryItem(userId, inventoryItem, { logRecent: true });

  revalidatePath("/profile");

  return {
    success: true,
    reward,
  };
}
