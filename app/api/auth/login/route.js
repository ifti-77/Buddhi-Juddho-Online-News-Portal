import dbConnect from "@/lib/mongodb";
import journalists from "@/lib/models/journalists"; // your mongoose model
import { getSession } from "@/lib/session";
import crypto from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(crypto.scrypt);

async function verifyPassword(password, salt, expectedHash) {
  const buf = await scryptAsync(password, salt, 64);
  return crypto.timingSafeEqual(
    Buffer.from(expectedHash, "hex"),
    Buffer.from(buf.toString("hex"), "hex")
  );
}

export async function POST(req) {
  const { username, password } = await req.json();
  if (!username || !password) {
    return Response.json({ ok: false, error: "Missing credentials" }, { status: 400 });
  }

  await dbConnect();
  const user = await journalists.findOne({ username, password });
  if (!user) return Response.json({ ok: false, error: "Invalid login" }, { status: 401 });

//   const ok = await verifyPassword(password, user.passwordSalt, user.passwordHash);
//   if (!ok) return Response.json({ ok: false, error: "Invalid login" }, { status: 401 });

// if(username !== "journalist1" || password !== "password123") {
//     return Response.json({ ok: false, error: "Invalid login" }, { status: 401 });
//   }

  // const session = await getSession();
  // session.isLoggedIn = true;
  // session.username = username;
  // session.role = "default"; // "admin" | "employee"
  // await session.save(); // writes encrypted cookie :contentReference[oaicite:4]{index=4}
  // console.log("Session after login:", session);

  return Response.json({ ok: true, user: user }, { status: 200 });
}
