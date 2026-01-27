"use client"

import {logoutOperation} from "@/actions/logoutOperation";
export default function LogoutOperation() {

    return (
        <div>
            <form action={logoutOperation}>

                <button type="submit"
                    className="mx-auto px-6 py-2.5 border-none rounded-sm bg-red-500 hover:bg-red-600 text-white cursor-pointer">
                    Logout
                </button>
            </form>
        </div>
    )
}
