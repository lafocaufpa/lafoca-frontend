import AdminLayout from '@/components/admin/layout/layout';
import EditLine from '@/components/admin/linesOfResearch/EditLineOfResearch';

export default function EditMemberPage({params}) {
  return (
    <AdminLayout>
      <EditLine  lineId={params.lineId} />
    </AdminLayout>
  );
}