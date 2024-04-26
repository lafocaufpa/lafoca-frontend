
import LogoutButton from '@/components/auth/Logout/LogoutButton';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
export default async function adminPage(){

  const session = await getServerSession();

  if(!session) {
    console.log('dentro de admin');
    redirect('/login');
  }

  return (
    <div>
      {console.log('area restrita')}
      <h1>Area restrita do administrdor</h1>
      <p>Bem vindo, <span>{JSON.stringify(session)}</span></p>
      <LogoutButton/>
    </div>
  );
}