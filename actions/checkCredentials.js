"use server";

import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function checkCredentials(prevState, formData) {
  const username = (formData.get("username") || "").toString().trim();
  const password = (formData.get("password") || "").toString();

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password }),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok || !data.ok) {
    return { ok: false, error: data.error || "Invalid username or password" };
  }


  if (data.user.status !== "active") {
    return {
      ok: false,
      error: "আপনার অ্যাকাউন্টটি সক্রিয় নয়, অনুগ্রহ করে প্রধান সম্পাদকের সাথে যোগাযোগ করুন!",
    };
  }


  const session = await getSession();
  session.isLoggedIn = true;
  session.userId = data.user._id;
  session.username = data.user.username;
  session.name = data.user.name;
  session.role = data.user.role;
  session.status = data.user.status;
  await session.save();

  if (data.user.role === "admin") redirect("/Authentication/admin");
  if (data.user.role === "editor") redirect("/Authentication/editor");
  if (data.user.role === "reporter") redirect("/Authentication/journalist");

  redirect("/Authentication");
}
