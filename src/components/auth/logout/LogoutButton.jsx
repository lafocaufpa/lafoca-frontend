'use client';

import Authorization from '@components/auth/authorization/authorization';

export default function LogoutButton () {

  const handleLogout = async () => {
    Authorization.logout();
  };

  return (
    <div>
      <button onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}
