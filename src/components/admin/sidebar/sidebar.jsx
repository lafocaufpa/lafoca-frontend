import routes from '@/routes';
import styles from './sidebar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import UserDefault from '@images/default_user.png';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { userService } from '@/services/api/Users/UserService';

export default async function SideBar() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  let user;
  try {
    user = await userService.readByEmail(session.user.email);
  } catch (error) {
    console.log('Erro ao buscar usuário:', error);
    return (
      <div className={styles.sideBar}>
        <p>Erro ao carregar dados do usuário.</p>
      </div>
    );
  }

  return (
    <div className={styles.sideBar}>
      <nav className={styles.sideBarNav}>
        <div className={styles.barItem}>
          <Link className={styles.barLink} href={routes.admin.user}>
            Usuário
          </Link>
        </div>
        <div className={styles.barItem}>
          <Link className={styles.barLink} href={routes.admin.member}>
            Membro
          </Link>
        </div>
      </nav>
      <div className={styles.userSection}>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <Image
          className={styles.userImage}
          src={user.urlPhoto || UserDefault}
          alt={user.name}
          width={80}
          height={80}
        />
      </div>
    </div>
  );
}
