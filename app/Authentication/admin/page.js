import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import LogoutOperation from '@/app/View/LogoutOperation';
import AdminOperation from '@/app/View/AdminOperation';
import ProfileUpdateOperation from '@/app/View/ProfileUpdateOperation';

export default async function admin() {
  
  const session = await getSession();
  if(!session.isLoggedIn || session.role !== "admin") {
    redirect('/Authentication');
  }
  
    return (
    <div className="bg-[#f8f7f4] min-h-screen">
      <div className="container mx-auto px-4 py-8">

        <div className="bg-white border-2 border-gray-300 p-6 mb-6">
          <div className="border-b-4 border-black pb-4 mb-4">
            <h1 className="text-3xl font-bold uppercase tracking-wide">প্রকাশক ও সম্পাদক প্যানেল</h1>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg">
              স্বাগতম, <span className="font-bold">{session.name}</span>
            </p>
            <ProfileUpdateOperation name={session.name} />
            <LogoutOperation />
          </div>
        </div>


        <div className="bg-white border-2 border-gray-300">
          <AdminOperation role={session.role} username={session.username} />
        </div>
      </div>
    </div>
  )
}
