import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation';
import { checkCredentials } from '@/actions/checkCredentials';

export default async function login() {
  const session = await getSession();
  if(session.isLoggedIn) {
    redirect('Authentication/admin');
  }
  
    return (
    <div>
        <form action={checkCredentials} >
            Username: <input type="text" name="username" placeholder='Username' /><br/>
            Password: <input type="password" name="password" placeholder='Password' /><br/>
            <button type="submit">Login</button>
        </form>
    </div>
  )
}
