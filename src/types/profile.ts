export interface InventoryItem {
  uuid: string;
  name: string;
  category: string;
  value: number;
  image?: string;
  acquiredAt: string;
}

export interface UserProfile {
  _id?: string;
  username: string;
  email?: string;
  passwordHash?: string;
  balance: number;
  totalOpened: number;
  favoriteAgent?: string;
  recentRewards: InventoryItem[];
  inventory: InventoryItem[];
  updatedAt: string;
}
