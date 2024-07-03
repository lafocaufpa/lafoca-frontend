import EditArticle from '@/components/admin/articles/EditArticle';
import AdminLayout from '@/components/admin/layout/layout';

export default function EditArticlePage({params}) {
  return (
    <AdminLayout>
      <EditArticle articleId={params.artigoId} />
    </AdminLayout>
  );
}