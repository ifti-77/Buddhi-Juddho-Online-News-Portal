"use server"

import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
export  async function logoutOperation() {
    const session = await getSession();
    if (session.isLoggedIn) {

        session.destroy();
        redirect('/Authentication');
    }
}