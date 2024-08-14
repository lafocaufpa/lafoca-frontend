import { redirect } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import url from '@/routes/url';
import NavBar from '@components/admin/sidebar/navbar';
import { auth } from '@app/auth';

export default async function SideBar() {
  const session = await auth();
  if (!session) {
    redirect(url.auth.login);
  }

  const user = {urlPhoto: session.user.image, id: session.userId, name: session.user.name, email: session.user.email};

  return (
    <NavBar user={user}/>
  );
}
