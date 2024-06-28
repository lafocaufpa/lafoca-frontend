import AdminLayout from '@/components/admin/layout/layout';
import EditMember from '@/components/admin/member/EditMember';

export default function EditMemberPage({params}) {
  return (
    <AdminLayout>
      <EditMember  memberId={params.memberId} />
    </AdminLayout>
  );
}