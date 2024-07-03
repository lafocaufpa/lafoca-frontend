import AdminLayout from '@/components/admin/layout/layout';
import EditClassPage from '@/components/admin/classes/EditClassesPage';

export default function EditMemberPage({params}) {
  return (
    <AdminLayout>
      <EditClassPage turmaId={params.turmaId} />
    </AdminLayout>
  );
}