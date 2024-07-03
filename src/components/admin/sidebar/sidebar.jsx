import Link from 'next/link';
import Image from 'next/image';
import UserDefault from '@images/default_user.png';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Card } from 'react-bootstrap';
import LogoutButton from '@/components/auth/logout/LogoutButton';
import url from '@/routes/url';
import getCookie from '@/components/auth/authorization/getCookie';
import routes from '@/routes/routes';
import styles from './sidebar.module.css';
import NavBar from './navbar';

export default async function SideBar() {
  const session = await getServerSession();

  if (!session) {
    redirect(url.auth.login);
  }

  
  let user;
  try {
    const token = await getCookie();
    // eslint-disable-next-line no-undef
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const path = routes.users.readByEmail(session.user.email);
    const url = baseURL.concat(path);
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 10
      }
    });
    if (!response.ok) {
    
      throw new Error('Failed to fetch user data');
    }

    user = await response.json();


  } catch (error) {
    return (
      <div className="d-flex flex-column bg-dark text-white p-4" style={{ minHeight: '100vh', width: '250px' }}>
        <p>Erro ao carregar dados do usuário.</p>
      </div>
    );
  }

  return (
    <NavBar user={user}/>
  );
}
