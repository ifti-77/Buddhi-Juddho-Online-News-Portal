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

  const data = await res.json(); 

  // IMPORTANT: if login failed, user won't exist
  if (!res.ok || !data.ok) {
    return { ok: false, error: data.error || "Invalid login" };
  }

  const session = await getSession();
  session.isLoggedIn = true;
  session.username = data.user.username;
  session.name = data.user.name;
  session.role = data.user.role;
  session.status = data.user.status;
  await session.save();
  console.log(session);
  
  if(session.isLoggedIn && session.role === "admin")
  {  
    redirect("/Authentication/admin") 
  }
  else if(session.isLoggedIn && session.role === "editor")
  {
    redirect("/Authentication/editor")
  }
  else if(session.isLoggedIn && session.role === "reporter")
  {
    redirect("/Authentication/journalist");
  }else
  {
    redirect("/Authentication");
  }

}
