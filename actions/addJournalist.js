"use server";

import { revalidatePath } from "next/cache";

export async function addJournalist(formData) {
  const name = (formData.get("name") || "").toString().trim();
  const username = (formData.get("username") || "").toString().trim();
  const password = (formData.get("password") || "").toString();
  const role = (formData.get("role") || "reporter").toString();

  // basic validation
  if (!name || !username || !password) {
    return { ok: false, error: "All fields are required" };
  }

  // IMPORTANT: on the server, using an absolute URL is safest
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/journalists/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, username, password, role }),
    cache: "no-store",
  });

  const result = await res.json(); // Response.json() returns a promise :contentReference[oaicite:1]{index=1}

  if (!res.ok || result.ok === false) {
    return { ok: false, error: result.error || "Failed to add journalist" };
  }

  // refresh data on the admin page (if you show journalist list there)
  revalidatePath("/Authentication/admin"); // works in Server Actions :contentReference[oaicite:2]{index=2}

  return result; // { ok: true, message: "Journalist added successfully" }
}
