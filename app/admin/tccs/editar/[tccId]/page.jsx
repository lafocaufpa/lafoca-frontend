import AdminLayout from '@/components/admin/layout/layout';
import EditTccsPage from '@/components/admin/tccs/EditTccsPage';


export default function EditMemberPage({params}) {
  return (
    <AdminLayout>
      <EditTccsPage tccId={params.tccId} />
    </AdminLayout>
  );
}