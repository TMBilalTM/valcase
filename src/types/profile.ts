import type { ObjectId } from "mongodb";

export interface InventoryItem {
  instanceId?: string;
  uuid: string;
  name: string;
  category: string;
  value: number;
  image?: string;
  acquiredAt: string;
}

export interface UserProfile {
  _id?: ObjectId;
  username: string;
  email?: string;
  passwordHash?: string;
  balance: number;
  totalOpened: number;
  favoriteAgent?: string;
  recentRewards: InventoryItem[];
  inventory: InventoryItem[];
  updatedAt: string;
  lastClaimDate?: string;
  loginStreak?: number;
  nextReward?: number;
}
