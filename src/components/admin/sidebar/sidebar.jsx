import routes from '@/routes';
import styles from './sidebar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function SideBar() {

  const session = await getServerSession();

  if (!session) {
    redirect('/login');
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
        <h3>{session.user.name}</h3>
        <p>{session.user.email}</p>
        <Image
          className={styles.userImage}
          src={session.user.image}
          alt={session.user.name}
          width={80}
          height={80}
        />
      </div>
    </div>
  );
}
