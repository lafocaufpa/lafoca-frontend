import AdminLayout from '@/components/admin/layout/layout';
import UserPage from '@/components/admin/user/user';

export default function UsuarioPageAdmin() {
  return (
    <AdminLayout>
      <UserPage />
    </AdminLayout>
  );
}