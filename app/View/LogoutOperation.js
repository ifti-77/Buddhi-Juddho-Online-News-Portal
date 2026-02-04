"use client"

import {logoutOperation} from "@/actions/logoutOperation";
export default function LogoutOperation() {

    return (
        <form action={logoutOperation}>
            <button 
                type="submit"
                className="px-6 py-2 bg-black text-white font-bold uppercase text-sm tracking-wide hover:bg-gray-800 transition-colors"
            >
                প্রস্থান
            </button>
        </form>
    )
}
