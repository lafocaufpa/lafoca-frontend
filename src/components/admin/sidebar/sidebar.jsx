import routes from '@/routes';
import styles from './sidebar.module.css';
import Link from 'next/link';

export default function SideBar() {
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
    </div>
  );
}