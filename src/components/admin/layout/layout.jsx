import SideBar from '@components/admin/sidebar/sidebar';
import styles from './layout.module.css';

export default function AdminLayout({ children }) {
  return (
    <div className='d-flex h-100'>
      <SideBar />
      <div className={`flex-grow-1 overflow-auto ${styles.container}`} style={{height:'100vh'}}>
        {children}
      </div>
    </div>
  );
}
