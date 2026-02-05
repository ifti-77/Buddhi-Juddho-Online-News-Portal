"use client"

import {logoutOperation} from "@/actions/logoutOperation";
export default function LogoutOperation() {

    return (
        <form action={logoutOperation}>
            <button 
                type="submit"
                className="px-6 py-2 bg-red-400 text-white font-bold uppercase text-sm tracking-wide hover:bg-red-500 transition-colors cursor-pointer"
            >
                লগআউট
            </button>
        </form>
    )
}
