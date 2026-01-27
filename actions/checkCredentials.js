"use server";

import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function checkCredentials(formData) {
  const username = (formData.get("username") || "").toString().trim();
  const password = (formData.get("password") || "").toString();

  const res = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password }),
    cache: "no-store",
  });

  const data = await res.json(); // <-- THIS is { ok, user } or { ok:false, error }

  // IMPORTANT: if login failed, user won't exist
  if (!res.ok || !data.ok) {
    return { ok: false, error: data.error || "Invalid login" };
  }

  const session = await getSession();
  session.isLoggedIn = true;
  session.username = data.user.username;
  session.role = data.user.role;
  await session.save();

  redirect("/Authentication/admin");
}
