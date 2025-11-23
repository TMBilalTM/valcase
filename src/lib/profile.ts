import { getCollection } from "@/lib/mongodb";
import type { UserProfile } from "@/types/profile";
import type { CaseReward } from "@/types/valorant";
import { ObjectId } from "mongodb";

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

    const inventoryItem = {
      uuid: reward.uuid,
      name: reward.name,
      category: reward.type,
      value: reward.value,
      image: reward.image,
      acquiredAt: new Date().toISOString(),
    };

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
