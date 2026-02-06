"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { checkCredentials } from "@/actions/checkCredentials";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-black text-white py-3 font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-60"
    >
      {pending ? "যাচাই করা হচ্ছে..." : "লগইন করুন"}
    </button>
  );
}

const initialState = { ok: true, error: "" };

export default function LoginForm() {
  const [state, formAction] = useActionState(checkCredentials, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {state?.ok === false && (
        <div className="border-2 border-red-600 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          {state.error}
        </div>
      )}

      <div>
        <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
          ইউজারনেম
        </label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
          পাসওয়ার্ড
        </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black focus:outline-none"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
