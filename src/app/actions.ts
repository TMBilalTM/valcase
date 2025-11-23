"use server";

import { cookies } from "next/headers";
import { getUserProfile, updateUserBalance, addRewardToProfile } from "@/lib/profile";
import { CASES } from "@/data/cases";
import { getValorantContent } from "@/lib/valorant-api";
import { openCase } from "@/lib/case-engine";
import { revalidatePath } from "next/cache";
import { verifyToken } from "@/lib/auth";

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

export async function getBalanceAction() {
  const userId = await getSessionId();
  if (!userId) return 0;
  
  const profile = await getUserProfile(userId);
  return profile ? profile.balance : 0;
}
