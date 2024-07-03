import AdminLayout from '@/components/admin/layout/layout';
import EditProjectPage from '@/components/admin/projects/EditProjectPage';

export default function EditMemberPage({params}) {
  return (
    <AdminLayout>
      <EditProjectPage projectId={params.projetoId} />
    </AdminLayout>
  );
}