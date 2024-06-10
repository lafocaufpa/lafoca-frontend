import SideBar from '@components/admin/sidebar/sidebar';
import styles from './layout.module.css';

export default function AdminLayout({ children }) {
  return (
    <div className={styles.container}>
      <SideBar/>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}