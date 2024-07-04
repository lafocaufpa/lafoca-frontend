import AdminLayout from '@/components/admin/layout/layout';
import EditGroup from '@/components/admin/groups/EditGroupPage';

export default function EditMemberPage({params}) {
  return (
    <AdminLayout>
      <EditGroup groupId={params.grupoId} />
    </AdminLayout>
  );
}