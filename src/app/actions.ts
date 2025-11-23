"use server";

import { cookies } from "next/headers";
import { getUserProfile, updateUserBalance, addRewardToProfile } from "@/lib/profile";
import { CASES } from "@/data/cases";
import { getValorantContent } from "@/lib/valorant-api";
import { openCase } from "@/lib/case-engine";
import { revalidatePath } from "next/cache";
import { verifyToken } from "@/lib/auth";
import { getCollection } from "@/lib/mongodb";
import type { UserProfile } from "@/types/profile";
import { ObjectId } from "mongodb";

const INITIAL_DAILY_REWARD = 650;
const STREAK_BONUS = 50;

export async function getSessionId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("valcase_token");
  
  if (!token) {
    return null;
  }

  const payload = verifyToken(token.value) as any;
  if (!payload || !payload.userId) {
    return null;
  }

  return payload.userId as string;
}

export async function openCaseAction(caseId: string) {
  const userId = await getSessionId();
  
  if (!userId) {
    return { error: "Lütfen giriş yapın." };
  }

  const profile = await getUserProfile(userId);
  
  if (!profile) {
    return { error: "Kullanıcı profili bulunamadı." };
  }

  const caseDef = CASES.find((c) => c.id === caseId);

  if (!caseDef) {
    return { error: "Kasa bulunamadı." };
  }

  if (profile.balance < caseDef.price) {
    return { error: "Yetersiz bakiye." };
  }

  const content = await getValorantContent();
  const reward = openCase(caseDef, content);

  if (!reward) {
    return { error: "Kasa açılırken bir hata oluştu." };
  }

  // Only subtract price, do NOT add reward value to balance
  const newBalance = profile.balance - caseDef.price;

  // Update DB
  await Promise.all([
    updateUserBalance(userId, newBalance),
    addRewardToProfile(userId, reward),
  ]);

  revalidatePath("/");
  revalidatePath("/profile");

  return { success: true, reward, newBalance };
}

export async function openMultipleCasesAction(caseId: string, count: 5 | 10) {
  const userId = await getSessionId();
  
  if (!userId) {
    return { error: "Lütfen giriş yapın." };
  }

  const profile = await getUserProfile(userId);
  
  if (!profile) {
    return { error: "Kullanıcı profili bulunamadı." };
  }

  const caseDef = CASES.find((c) => c.id === caseId);

  if (!caseDef) {
    return { error: "Kasa bulunamadı." };
  }

  const totalCost = caseDef.price * count;

  if (profile.balance < totalCost) {
    return { error: `Yetersiz bakiye. ${count} kasa için ${totalCost.toLocaleString("tr-TR")} VP gerekli.` };
  }

  const content = await getValorantContent();
  const rewards = [];

  for (let i = 0; i < count; i++) {
    const reward = openCase(caseDef, content);
    if (reward) {
      rewards.push(reward);
    }
  }

  if (rewards.length === 0) {
    return { error: "Kasalar açılırken bir hata oluştu." };
  }

  const newBalance = profile.balance - totalCost;

  await updateUserBalance(userId, newBalance);
  
  for (const reward of rewards) {
    await addRewardToProfile(userId, reward);
  }

  revalidatePath("/");
  revalidatePath("/profile");

  return { success: true, rewards, newBalance, count: rewards.length };
}

export async function getBalanceAction() {
  const userId = await getSessionId();
  if (!userId) return 0;
  
  const profile = await getUserProfile(userId);
  return profile ? profile.balance : 0;
}

export async function claimDailyRewardAction() {
  const userId = await getSessionId();
  
  if (!userId) {
    return { error: "Lütfen giriş yapın." };
  }

  const profile = await getUserProfile(userId);
  
  if (!profile) {
    return { error: "Kullanıcı profili bulunamadı." };
  }

  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const lastClaim = profile.lastClaimDate ? profile.lastClaimDate.split("T")[0] : null;

  // Check if already claimed today
  if (lastClaim === today) {
    return { error: "Bugün zaten günlük ödülünüzü aldınız." };
  }

  // Calculate streak
  let newStreak = 1;
  if (lastClaim) {
    const lastDate = new Date(lastClaim);
    const daysDiff = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 1) {
      // Consecutive day
      newStreak = (profile.loginStreak || 0) + 1;
    }
    // If more than 1 day, streak resets to 1
  }

  // Calculate reward: base + (streak - 1) * bonus
  const rewardAmount = INITIAL_DAILY_REWARD + (newStreak - 1) * STREAK_BONUS;
  const newBalance = profile.balance + rewardAmount;

  // Update profile
  const collection = await getCollection<UserProfile>("users");
  const query = ObjectId.isValid(userId) ? { _id: new ObjectId(userId) } : { username: userId };
  
  await collection.updateOne(
    query,
    {
      $set: {
        balance: newBalance,
        lastClaimDate: now.toISOString(),
        loginStreak: newStreak,
        nextReward: INITIAL_DAILY_REWARD + newStreak * STREAK_BONUS,
        updatedAt: now.toISOString()
      }
    }
  );

  revalidatePath("/");
  revalidatePath("/profile");

  return {
    success: true,
    reward: rewardAmount,
    newBalance,
    streak: newStreak,
    nextReward: INITIAL_DAILY_REWARD + newStreak * STREAK_BONUS
  };
}

export async function checkDailyRewardStatus() {
  const userId = await getSessionId();
  
  if (!userId) {
    return { canClaim: false };
  }

  const profile = await getUserProfile(userId);
  
  if (!profile) {
    return { canClaim: false };
  }

  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const lastClaim = profile.lastClaimDate ? profile.lastClaimDate.split("T")[0] : null;

  const canClaim = lastClaim !== today;
  const streak = profile.loginStreak || 0;
  const nextReward = profile.nextReward || INITIAL_DAILY_REWARD;

  return {
    canClaim,
    streak,
    nextReward,
    lastClaimDate: profile.lastClaimDate
  };
}
