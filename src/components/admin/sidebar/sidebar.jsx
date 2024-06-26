import Link from 'next/link';
import Image from 'next/image';
import UserDefault from '@images/default_user.png';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { userService } from '@/services/api/Users/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoutButton from '@/components/auth/logout/LogoutButton';
import url from '@/routes/url';
import getCookie from '@/components/auth/authorization/getCookie';
import routes from '@/routes/routes';

export default async function SideBar() {
  const session = await getServerSession();

  if (!session) {
    redirect(url.auth.login);
  }

  
  let user;
  try {
    const token = await getCookie();
    const response = await fetch(routes.users.readByEmail(session.user.email), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 15
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    user = await response.json();
  } catch (error) {
    return (
      <div className="d-flex flex-column bg-dark text-white p-4" style={{ minHeight: '100vh', minWidth: '250px' }}>
        <p>Erro ao carregar dados do usuário.</p>
      </div>
    );
  }

  const urlImage = user.urlPhoto || UserDefault;


  return (
    <div className="d-flex flex-column bg-dark text-white p-4" style={{ minHeight: '100vh', minWidth: '250px' }}>
      <nav className="nav flex-column mb-auto">
        <Link className="nav-link text-white" href={url.admin.usuario.home}>Usuário</Link>
        <Link className="nav-link text-white" href={url.admin.membro.home}>Membro</Link>
      </nav>
      
      <div className="mt-auto">
        <div className="text-center border-top border-secondary pt-4 pb-3">
          <div className="mb-3">
            <Image
              className="rounded-circle"
              src={urlImage}
              alt={user.name}
              width={80}
              height={80}
            />
          </div>
          <h5 className="mb-1">{user.name}</h5>
          <p className="mb-0 text-white fs-6">{user.email}</p>
        </div>
        <LogoutButton/>
      </div>
    </div>
  );
}
