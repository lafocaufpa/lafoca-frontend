import LogoutButton from '@/components/auth/logout/LogoutButton';
import Team from '@/components/home/Main/Team/Team';
import { userService } from '@/services/api/Users/UserService';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function adminPage(){
  
  const session = await getServerSession();

  
  if(!session) {
    console.log('sessao ');
    console.log(session);
    redirect('/login'); 
  }

  const users = await userService.list();

  return (
    <div>
      <h1>Area restrita do administrdor</h1>
      <p>Bem vindo, <span>{JSON.stringify(session)}</span></p>
      <LogoutButton/>
      <h2>Lista de usuários cadastrados no sistema</h2>
      {JSON.stringify(users)}
      <Team/>
    </div>
  );
}