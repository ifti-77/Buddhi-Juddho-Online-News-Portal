import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation';
import { checkCredentials } from '@/actions/checkCredentials';

export default async function login() {
  const session = await getSession();
  if(session.isLoggedIn) {
    if(session.role === "admin")
    {
      redirect('Authentication/admin');
    }else
    {
      redirect('Authentication/journalist');
    }
  }
  
    return (
    <div className="bg-[#f8f7f4] min-h-screen flex items-center justify-center py-12">
      <div className="bg-white border-2 border-gray-300 p-8 max-w-md w-full">
        <div className="border-b-4 border-black pb-4 mb-6">
          <h1 className="text-3xl font-bold uppercase tracking-wide text-center">প্রশাসক লগইন</h1>
        </div>
        <form action={checkCredentials} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2 uppercase tracking-wide">ব্যবহারকারীর নাম</label>
            <input 
              type="text" 
              name="username" 
              placeholder='Username' 
              className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 uppercase tracking-wide">পাসওয়ার্ড</label>
            <input 
              type="password" 
              name="password" 
              placeholder='Password' 
              className="w-full px-4 py-2 border-2 border-gray-300 focus:border-black focus:outline-none"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-black text-white py-3 font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors"
          >
            লগইন করুন
          </button>
        </form>
      </div>
    </div>
  )
}
