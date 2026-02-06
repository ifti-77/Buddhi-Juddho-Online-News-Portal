"use server";

import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function addJournalist(formData) {
  const name = (formData.get("name") || "").toString().trim();
  const username = (formData.get("username") || "").toString().trim();
  const password = (formData.get("password") || "").toString();
  const role = (formData.get("role") || "reporter").toString();

  
  if (!name || !username || !password) {
    return { ok: false, error: "All fields are required" };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";

  const res = await fetch(`${baseUrl}/api/journalists/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, username, password, role }),
    cache: "no-store",
  });

  const result = await res.json(); 

  if (!res.ok || result.ok === false) {
    return { ok: false, error: result.error || "Failed to add journalist" };
  }

  
  revalidatePath("/Authentication/admin"); 

  return result; 
}

export async function UpdateJournalistProfile(formData) {
  const session = await getSession();

  const id = session?.userId;
  const newpassword = formData.get("newPassword")?.toString();
  const currentpassword = formData.get("currentPassword")?.toString();
  if (!id || !newpassword || !currentpassword) {
    return { ok: false, error: "All fields are required" };
  }

  const checkValidity = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/journalists/update/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, currentPassword: currentpassword }),
    cache: "no-store",
  });

  const validityResult = await checkValidity.json();

  if (!checkValidity.ok || validityResult.ok === false) {
    return { ok: false, error: validityResult.error || "Current password is incorrect" };
  }

  const updateRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/journalists/update/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, newPassword: newpassword }),
    cache: "no-store",
  });

  const updateResult = await updateRes.json();

  if (!updateRes.ok || updateResult.ok === false) {
    return { ok: false, error: updateResult.error || "Failed to update password" };
  }

  return updateResult;
}