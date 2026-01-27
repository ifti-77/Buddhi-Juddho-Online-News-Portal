import React from 'react'
import Link from 'next/link'
import { getSession } from '@/lib/session'

const Navbar = async () => {
    const session = await getSession();

    return (
        <div>
            <ul className='flex flex-row gap-2 justify-end'>
                <li className='hover:text-blue-400'>
                    <Link href='/'>Home</Link>
                </li>
                <li className='hover:text-blue-400'>
                    <Link href='/about'>About</Link>
                </li>
                <li className='hover:text-blue-400'>
                    <Link href='/contact'>Contact</Link>
                </li>
               {session.isLoggedIn? (<li className='hover:text-blue-400'>
                    <Link href='/Authentication/admin'>Dashboard</Link>
                </li>):(<li className='hover:text-blue-400'>
                    <Link href='/Authentication'>Login</Link>
                </li>)}
            </ul>
        </div>
    )
}

export default Navbar