"use server";

import { getCollection } from "@/lib/mongodb";
import { UserProfile } from "@/types/profile";
import { hashPassword, comparePassword, signToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerAction(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!username || !email || !password) {
    return { error: "Tüm alanları doldurun." };
  }

  const users = await getCollection<UserProfile>("users");

  // Check if user exists
  const existingUser = await users.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return { error: "Bu kullanıcı adı veya e-posta zaten kullanımda." };
  }

  const passwordHash = await hashPassword(password);

  const newUser: UserProfile = {
    username,
    email,
    passwordHash,
    balance: 10000, // Starting balance
    totalOpened: 0,
    recentRewards: [],
    inventory: [],
    updatedAt: new Date().toISOString(),
  };

  const result = await users.insertOne(newUser);
  
  // Create session
  const token = signToken({ userId: result.insertedId.toString(), username });
  
  const cookieStore = await cookies();
  cookieStore.set("valcase_token", token, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });

  return { success: true };
}

export async function loginAction(formData: FormData) {
  const emailOrUsername = formData.get("emailOrUsername") as string;
  const password = formData.get("password") as string;

  if (!emailOrUsername || !password) {
    return { error: "Tüm alanları doldurun." };
  }

  const users = await getCollection<UserProfile>("users");

  const user = await users.findOne({ 
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }] 
  });

  if (!user || !user.passwordHash) {
    return { error: "Kullanıcı bulunamadı veya şifre hatalı." };
  }

  const isValid = await comparePassword(password, user.passwordHash);

  if (!isValid) {
    return { error: "Kullanıcı bulunamadı veya şifre hatalı." };
  }

  // Create session
  const token = signToken({ userId: user._id!.toString(), username: user.username });
  
  const cookieStore = await cookies();
  cookieStore.set("valcase_token", token, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });

  return { success: true };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("valcase_token");
  redirect("/login");
}
