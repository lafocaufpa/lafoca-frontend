'use client';

import IconLogout from '@/components/icon/IconLogout';
import Authorization from '@components/auth/authorization/authorization';

export default function LogoutButton() {
  const handleLogout = async () => {
    Authorization.logout();
  };

  return (
    <IconLogout width='25' heith='25' onClick={handleLogout}/>
  );
}
