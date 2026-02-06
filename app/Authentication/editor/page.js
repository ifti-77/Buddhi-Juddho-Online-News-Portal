import EditorOperation from '@/app/View/EditorOperation';
import LogoutOperation from '@/app/View/LogoutOperation';
import ProfileUpdateOperation from '@/app/View/ProfileUpdateOperation';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';


export default async function editor() {
  const session = await getSession();

  if (!session.isLoggedIn || session.role !== "editor" || session.status !== "active") {
    redirect('/Authentication');
  }


  return (
    <div className="bg-[#f8f7f4] min-h-screen">
      <div className="container mx-auto px-4 py-8">

        <div className="bg-white border-2 border-gray-300 p-6 mb-6">
          <div className="border-b-4 border-black pb-4 mb-4">
            <h1 className="text-3xl font-bold uppercase tracking-wide">সম্পাদক প্যানেল</h1>
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
          <EditorOperation role={session.role} username={session.username} />
        </div>
      </div>
    </div>
  )
}
