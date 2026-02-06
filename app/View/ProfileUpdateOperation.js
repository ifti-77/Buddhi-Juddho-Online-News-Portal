"use client"

import { useState } from "react"
import { UpdateJournalistProfile } from "@/actions/addJournalist"

export default function ProfileUpdateOperation() {
    const [showUpdateProfileForm, setShowUpdateProfileForm] = useState(false)

    return (
        <>
            <div>
                <button className={`${!showUpdateProfileForm?"bg-blue-300 hover:bg-blue-400":"bg-gray-300 hover:bg-gray-400"} border-none text-white shadow-md`}
                onClick={() => setShowUpdateProfileForm(!showUpdateProfileForm)}>{showUpdateProfileForm?"Close":"Update Profile"}</button>
            </div>
            {showUpdateProfileForm && <div>
                <form action={UpdateJournalistProfile}>
                    Update Password: <input type="password" placeholder="Enter new password" name="newPassword"/><br/>
                    Current Password: <input type="password" placeholder="Enter current password" name="currentPassword"/><br/>
                    <input type="submit" value="Update Profile"/>
                </form>
            </div>}
        </>
    )
}
