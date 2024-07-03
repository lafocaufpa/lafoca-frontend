import AdminLayout from '@/components/admin/layout/layout';
import EditFunction from '@/components/admin/functionMember/EditFunctionMember';

export default function EditMemberPage({params}) {
  return (
    <AdminLayout>
      <EditFunction functionId={params.funcaoId} />
    </AdminLayout>
  );
}