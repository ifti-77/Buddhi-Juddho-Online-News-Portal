import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export const sessionOptions = {
  cookieName: "newsportal_session",
  password: process.env.IRON_SESSION_PASSWORD,
  cookieOptions: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",

    
    maxAge: undefined, 
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession(cookieStore, sessionOptions);
}
