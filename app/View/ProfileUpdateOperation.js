'use client'

import { useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { UpdateJournalistProfile } from '@/actions/JournalistAction'

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full border-2 border-black bg-black px-4 py-2 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {pending ? 'Updating…' : 'Update Profile'}
        </button>
    )
}

export default function ProfileUpdateOperation({ name }) {
    const [open, setOpen] = useState(false)
    const [currentName, setCurrentName] = useState(name ?? '')
    const formRef = useRef(null)


    useEffect(() => {
        setCurrentName(name ?? '')
    }, [name])


    useEffect(() => {
        if (open) {
            formRef.current?.reset()
            setCurrentName(name ?? '')
        }
    }, [open, name])

    return (
        <div className="relative inline-block">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={`border-2 border-black px-4 py-2 text-sm font-bold uppercase tracking-wide shadow-sm transition ${open
                        ? 'bg-gray-200 text-black hover:bg-gray-300'
                        : 'bg-white text-black hover:bg-black hover:text-white'
                    }`}
            >
                {open ? 'Close' : 'Update Profile'}
            </button>

            {open && (
                <div className="absolute right-0 mt-3 w-80 border-2 border-gray-300 bg-white shadow-md z-50">
                    <div className="border-b-4 border-black px-4 py-3">
                        <p className="text-sm font-bold uppercase tracking-wide">Profile Update</p>
                        <p className="text-xs text-gray-600">Update name and/or password</p>
                    </div>

                    <form ref={formRef} action={UpdateJournalistProfile} className="px-4 py-4 space-y-3">
                        <div className="space-y-1">
                            <label htmlFor="newName" className="text-xs font-bold uppercase tracking-wide text-gray-700">
                                Name
                            </label>
                            <input
                                id="newName"
                                name="newName"
                                type="text"
                                value={currentName}
                                onChange={(e) => setCurrentName(e.target.value)}
                                className="w-full border-2 border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
                                placeholder="Fix your name"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="newPassword" className="text-xs font-bold uppercase tracking-wide text-gray-700">
                                New Password
                            </label>
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                autoComplete="new-password"
                                className="w-full border-2 border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
                                placeholder="Enter new password (optional)"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="currentPassword" className="text-xs font-bold uppercase tracking-wide text-gray-700">
                                Current Password*
                            </label>
                            <input
                                id="currentPassword"
                                name="currentPassword"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="w-full border-2 border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
                                placeholder="Enter current password"
                            />
                        </div>

                        <SubmitButton />
                    </form>
                </div>
            )}
        </div>
    )
}
