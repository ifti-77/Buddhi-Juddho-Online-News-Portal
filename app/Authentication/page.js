import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import LoginForm from "../View/LoginForm";


export default async function login() {
  const session = await getSession();

  if (session.isLoggedIn && session.role === "admin") redirect("/Authentication/admin");
  else if (session.isLoggedIn && session.role === "editor") redirect("/Authentication/editor");
  else if (session.isLoggedIn && session.role === "reporter") redirect("/Authentication/journalist");

  return (
    <div className="bg-[#f8f7f4] min-h-screen flex items-center justify-center py-12">
      <div className="bg-white border-2 border-gray-300 p-8 max-w-md w-full">
        <div className="border-b-4 border-black pb-4 mb-6">
          <h1 className="text-3xl font-bold uppercase tracking-wide text-center">প্রশাসক লগইন</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
