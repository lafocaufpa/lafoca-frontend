import AdminLayout from '@/components/admin/layout/layout';
import SideBar from '@/components/admin/sidebar/sidebar';
import LogoutButton from '@/components/auth/logout/LogoutButton';
import Team from '@/components/home/Main/Team/Team';
import { userService } from '@/services/api/Users/UserService';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function adminPage(){
  
  const session = await getServerSession();

  
  if(!session) {
    redirect('/login'); 
  }



  return (
    <AdminLayout>
      {/* Conteúdo inicial da página admin pode ir aqui */}
      <h1>Bem-vindo à área administrativa</h1>
    </AdminLayout>
  );
}