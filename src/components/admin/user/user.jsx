'use client';

import { userService } from '@/services/api/Users/UserService';
import DashboardUser from '@components/admin/user/dashboard/dashboard';
import { useEffect, useState } from 'react';

export default function UserPage() {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await userService.list();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <h1>Aqui serão listadas as configurações de usuário</h1>
      {error ? (
        <div style={{ color: 'red' }}>Erro ao buscar usuários: {error}</div>
      ) : (
        <pre>{JSON.stringify(users, null, 2)}</pre>
      )}
      <DashboardUser />
    </div>
  );
}
