'use client';

import { userService } from '@/services/api/Users/UserService';
import DashboardUser from '@components/admin/user/dashboard/dashboard';
import { useEffect, useState } from 'react';

export default function UserPage() {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async (page = 0) => {
    try {
      const data = await userService.list(page);
      setUsers(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (userId) => {
    // Função de manipulação de edição
    console.log('Editar usuário com ID:', userId);
  };

  const handleDelete = async (userId) => {
    try {
      await userService.delete(userId);
      fetchData(currentPage);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Aqui serão listadas as configurações de usuário</h1>
      {error ? (
        <div style={{ color: 'red' }}>Erro ao buscar usuários: {error}</div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Grupos</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.groups.map((group) => group.name).join(', ')}</td>
                  <td>
                    <button onClick={() => handleEdit(user.id)}>Editar</button>
                    <button onClick={() => handleDelete(user.id)}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                style={{ fontWeight: currentPage === index ? 'bold' : 'normal' }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
      <DashboardUser />
    </div>
  );
}
