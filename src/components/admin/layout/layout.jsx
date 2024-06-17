import SideBar from '@components/admin/sidebar/sidebar';

export default function AdminLayout({ children }) {
  return (
    <div className='d-flex h-100'>
      <SideBar />
      <div className='flex-grow-1 overflow-auto' style={{height:'100vh'}}>
        {children}
      </div>
    </div>
  );
}
