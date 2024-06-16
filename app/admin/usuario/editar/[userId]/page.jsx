import AdminLayout from '@/components/admin/layout/layout';
import EditUser from '@/components/admin/user/EditUser';

export default function AddUserPage({params}) {
  return (
    <AdminLayout>
      <EditUser  userId={params.userId} />
    </AdminLayout>
  );
}