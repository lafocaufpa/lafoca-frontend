'use client';

import { userService } from '@/services/api/Users/UserService';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const router = useRouter();

  const fetchData = async (page = 0, resultsPerPage = 10) => {
    try {
      const data = await userService.list(page, resultsPerPage);
      setUsers(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData(currentPage, resultsPerPage);
  }, [currentPage, resultsPerPage]);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const handleResultsPerPageChange = (event) => {
    setResultsPerPage(Number(event.target.value));
    setCurrentPage(0); 
  };

  const handleEdit = (userId) => {
    console.log('Editar usuário com ID:', userId);
  };

  const handleDelete = async (userId) => {
    try {
      await userService.delete(userId);
      fetchData(currentPage, resultsPerPage);
    } catch (error) {
      setError(error.message);
    }
  };

  const getResultMessage = () => {
    const start = currentPage * resultsPerPage + 1;
    const end = Math.min((currentPage + 1) * resultsPerPage, totalResults);
    return `Exibindo ${start} a ${end} usuários de ${totalResults} resultados`;
  };

  const handleAddUser = () => {
    router.push('adicionar');
  };

  const confirmDelete = (userId) => {
    setUserToDelete(userId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmModal(false);
    if (userToDelete) {
      await handleDelete(userToDelete);
      setUserToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setUserToDelete(null);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
        <h1>Configurações de Usuário</h1>
        <button className="btn btn-success" onClick={handleAddUser}>Adicionar Usuário</button>
      </div>
      {error ? (
        <div className="alert alert-danger">Erro ao buscar usuários: {error}</div>
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <label htmlFor="resultsPerPage" className="d-inline-block" style={{fontSize:'0.75rem'}}>Mostrando</label>
              <input
                type="number"
                id="resultsPerPage"
                value={resultsPerPage}
                onChange={handleResultsPerPageChange}
                className="form-control d-inline-block mx-2"
                style={{ width: '60px', fontSize:'0.75rem'} }
              />
              <span className="ml-2 text-reset" style={{fontSize:'0.75rem'}}>resultados por página</span>
            </div>
            <span className="mb-0 text-reset" style={{fontSize:'0.75rem'}}>{getResultMessage()}</span>
          </div>
          <table className="table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Grupos</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.groups.map((group) => group.name).join(', ')}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{marginRight:'0.5rem'}}
                      onClick={() => handleEdit(user.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => confirmDelete(user.id)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between align-items-center">
            <nav aria-label="Page navigation">
              <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} aria-label="Previous">
                    &laquo;
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index} className={`page-item ${currentPage === index ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(index)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} aria-label="Next">
                    &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      {showConfirmModal && (
        <div className="modal show fade" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Exclusão</h5>
              </div>
              <div className="modal-body">
                <p>Tem certeza que deseja excluir este usuário?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>Cancelar</button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Excluir</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
