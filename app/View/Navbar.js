
import Link from 'next/link'
import Image from 'next/image'
import { getSession } from '@/lib/session'

const Navbar = async () => {
    const session = await getSession();

    return (
        <nav className='bg-white border-b-4 border-black'>
            {/* Newspaper Masthead */}
            <div className="border-b border-gray-300 bg-white">
                <div className="container mx-auto px-4 py-1 sm:py-1">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* LEFT: Logo */}
                        <div className="relative w-80 h-24 sm:w-110 sm:h-16 md:w-185 md:h-20 ">
                            <Image
                                src="/Buddhi-Juddho-NavBar-Icon.png"
                                alt="বুদ্ধিযুদ্ধো Logo"
                                fill
                                priority
                                sizes="(max-width: 640px) 320px, (max-width: 768px) 440px, 740px"
                                className="object-contain object-left"
                            />
                        </div>

                        {/* RIGHT: Date */}
                        <p className="text-center md:text-right text-[16px] sm:text-sm text-gray-600 tracking-widest whitespace-nowrap">
                            {new Date().toLocaleDateString("bn-BD", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                </div>
            </div>
            <div className='bg-gray-100 border-b border-gray-300'>
                <div className='container mx-auto px-4'>
                    <ul className='flex flex-row gap-6 justify-center py-2 text-sm uppercase tracking-wide font-semibold'>
                        <li className='hover:text-gray-600'>
                            <Link href='/'>প্রচ্ছদ</Link>
                        </li>
                        <li className='hover:text-gray-600'>
                            <Link href='/about'>আমাদের সম্পর্কে</Link>
                        </li>
                        <li className='hover:text-gray-600'>
                            <Link href='/terms&condition'>শর্তাবলী ও নীতিমালা</Link>
                        </li>
                        {session.isLoggedIn ? (
                            <li className='hover:text-gray-600'>
                                <Link href='/Authentication/'>ড্যাশবোর্ড</Link>
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