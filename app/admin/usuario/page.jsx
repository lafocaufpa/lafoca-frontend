import AdminLayout from '@/components/admin/layout/layout';
import UserPage from '@/components/admin/user/user';

export default function UsuarioPageAdmin() {
  return (
    <AdminLayout>
      <h1>Usuário</h1>
      <UserPage />
    </AdminLayout>
  );
}