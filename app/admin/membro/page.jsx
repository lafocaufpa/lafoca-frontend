import AdminLayout from '@/components/admin/layout/layout';
import MemberPage from '@/components/admin/member/member';

export default function MembroPageAdmin(){
  return (
    <AdminLayout>
      <h1>Membro</h1>
      <MemberPage/>
    </AdminLayout>
  );
}