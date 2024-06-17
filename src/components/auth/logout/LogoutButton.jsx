'use client';

import Authorization from '@components/auth/authorization/authorization';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importe o CSS do Bootstrap aqui

export default function LogoutButton() {
  const handleLogout = async () => {
    Authorization.logout();
  };

  return (
    <div className="mt-auto text-center">
      <button className="btn btn-danger w-100" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}
