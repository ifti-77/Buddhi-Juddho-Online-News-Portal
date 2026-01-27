import NewsUploadForm from '@/app/View/NewsUploadForm'
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import LogoutOperation from '@/app/View/LogoutOperation';

export default async function admin() {
  
  const session = await getSession();
  console.log("Session in admin page:", session);
  if(!session.isLoggedIn) {
    redirect('/Authentication');
  }
  
    return (
    <div>
        <h1>Admin Page</h1>
        <p>Welcome {session.username}.</p>
        <aside>
            <h2>Sidebar</h2>
            <ul>
                <li>Manage Users</li>
                <li>Manage News</li>
                <li>Settings</li>
            </ul>
        </aside>
        <section className='mx-auto bg-gray-400 border border-blue-400 '>
            <NewsUploadForm/>
        </section>
        <LogoutOperation />
    </div>
  )
}
