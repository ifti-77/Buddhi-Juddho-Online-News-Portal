import React from 'react'
import Link from 'next/link'
import { getSession } from '@/lib/session'

const Navbar = async () => {
    const session = await getSession();

    return (
        <nav className='bg-white border-b-4 border-black'>
            {/* Newspaper Masthead */}
            <div className='border-b border-gray-300'>
                <div className='container mx-auto px-4 py-4'>
                    <div className='text-center'>
                        <h1 className='text-5xl font-bold tracking-wide mb-1' style={{fontFamily: 'Georgia, serif'}}>
                            বুদ্ধিযুদ্ধো
                        </h1>
                        <p className='text-xs text-gray-600 tracking-widest uppercase'>
                            {new Date().toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Navigation Menu */}
            <div className='bg-gray-100 border-b border-gray-300'>
                <div className='container mx-auto px-4'>
                    <ul className='flex flex-row gap-6 justify-center py-2 text-sm uppercase tracking-wide font-semibold'>
                        <li className='hover:text-gray-600'>
                            <Link href='/'>প্রচ্ছদ</Link>
                        </li>
                        <li className='hover:text-gray-600'>
                            <Link href='/about'>সম্পর্কে</Link>
                        </li>
                        {session.isLoggedIn ? (
                            <li className='hover:text-gray-600'>
                                <Link href='/Authentication/admin'>ড্যাশবোর্ড</Link>
                            </li>
                        ) : (
                            <li className='hover:text-gray-600'>
                                <Link href='/Authentication'>লগইন</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar