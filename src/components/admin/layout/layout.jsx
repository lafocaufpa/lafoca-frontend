import SideBar from '@components/admin/sidebar/sidebar';
import styles from './layout.module.css';

export default function AdminLayout({session, children }) {
  return (
    <div className={styles.container}>
      <SideBar session={session}/>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}