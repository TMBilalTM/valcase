import { getCollection } from "@/lib/mongodb";
import type { InventoryItem, UserProfile } from "@/types/profile";
import type { CaseReward } from "@/types/valorant";
import { ObjectId } from "mongodb";

export interface InventoryIdentifier {
  instanceId?: string;
  uuid?: string;
  acquiredAt?: string;
}

function withInstanceId(item: InventoryItem): InventoryItem {
  if (item.instanceId) {
    return item;
  }
  return {
    ...item,
    instanceId: new ObjectId().toString(),
  };
}

export async function getUserProfile(userId: string) {
  try {
    const collection = await getCollection<UserProfile>("users");
    // Try to find by _id if it's a valid ObjectId, otherwise fallback to username for legacy/guest
    const query = ObjectId.isValid(userId) ? { _id: new ObjectId(userId) } : { username: userId };
    const existing = await collection.findOne(query);

    if (existing) {
      return existing;
    }
    
    return null;
  } catch (error) {
    console.warn("Mongo bağlantısı kurulamadı.", error);
    return null;
  }
}

export async function updateUserBalance(userId: string, newBalance: number) {
  try {
    const collection = await getCollection<UserProfile>("users");
    const query = ObjectId.isValid(userId) ? { _id: new ObjectId(userId) } : { username: userId };
    
    await collection.updateOne(
      query,
      { $set: { balance: newBalance, updatedAt: new Date().toISOString() } }
    );
  } catch (error) {
    console.error("Bakiye güncellenemedi:", error);
  }
}

export async function addRewardToProfile(userId: string, reward: CaseReward) {
  try {
    const collection = await getCollection<UserProfile>("users");
    const query = ObjectId.isValid(userId) ? { _id: new ObjectId(userId) } : { username: userId };

    const inventoryItem = withInstanceId({
      uuid: reward.uuid,
      name: reward.name,
      category: reward.category,
      value: reward.value,
      image: reward.image,
      acquiredAt: new Date().toISOString(),
    });

    await collection.updateOne(
      query,
      {
        $push: {
          recentRewards: { $each: [inventoryItem], $position: 0, $slice: 20 },
          inventory: inventoryItem,
        },
        $inc: { totalOpened: 1 },
        $set: { updatedAt: new Date().toISOString() },
      }
    );
  } catch (error) {
    console.error("Ödül eklenemedi:", error);
  }
}

export async function addInventoryItem(userId: string, item: InventoryItem, options?: { logRecent?: boolean }) {
  try {
    const collection = await getCollection<UserProfile>("users");
    const query = ObjectId.isValid(userId) ? { _id: new ObjectId(userId) } : { username: userId };

    const normalized = withInstanceId(item);

    const pushDoc: Record<string, unknown> = {
      inventory: normalized,
    };

    if (options?.logRecent !== false) {
      pushDoc.recentRewards = { $each: [normalized], $position: 0, $slice: 20 };
    }

    await collection.updateOne(query, {
      $push: pushDoc,
      $set: { updatedAt: new Date().toISOString() },
    });
  } catch (error) {
    console.error("Envantere öge eklenemedi:", error);
  }
}

export async function removeInventoryItems(userId: string, identifiers: InventoryIdentifier[]) {
  if (!identifiers.length) return;

  const instanceIds = Array.from(new Set(identifiers.map((item) => item.instanceId).filter(Boolean))) as string[];
  const compoundMatches = identifiers
    .filter((item): item is Required<Pick<InventoryIdentifier, "uuid" | "acquiredAt">> => Boolean(item.uuid && item.acquiredAt))
    .map((item) => ({ uuid: item.uuid!, acquiredAt: item.acquiredAt! }));
  const uuidFallbacks = Array.from(
    new Set(
      identifiers
        .filter((item) => item.uuid && !item.acquiredAt)
        .map((item) => item.uuid as string)
    )
  );

  if (!instanceIds.length && !compoundMatches.length && !uuidFallbacks.length) {
    return;
  }

  const pullConditions: Record<string, unknown>[] = [];
  if (instanceIds.length) {
    pullConditions.push({ instanceId: { $in: instanceIds } });
  }
  if (compoundMatches.length) {
    pullConditions.push(
      ...compoundMatches.map((match) => ({
        $and: [
          { uuid: match.uuid },
          { acquiredAt: match.acquiredAt },
        ],
      }))
    );
  }
  if (uuidFallbacks.length) {
    pullConditions.push({ uuid: { $in: uuidFallbacks } });
  }

  const pullQuery = pullConditions.length > 1 ? { $or: pullConditions } : pullConditions[0];

  try {
    const collection = await getCollection<UserProfile>("users");
    const query = ObjectId.isValid(userId) ? { _id: new ObjectId(userId) } : { username: userId };

    await collection.updateOne(query, {
      $pull: {
        inventory: pullQuery,
        recentRewards: pullQuery,
      },
      $set: { updatedAt: new Date().toISOString() },
    });
  } catch (error) {
    console.error("Envanterden ögeler silinemedi:", error);
  }
}
