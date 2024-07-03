import AdminLayout from '@/components/admin/layout/layout';
import EditSkillsPage from '@/components/admin/habilidades/EditSkillsPage';

export default function EditMemberPage({params}) {
  return (
    <AdminLayout>
      <EditSkillsPage skillId={params.skillId} />
    </AdminLayout>
  );
}