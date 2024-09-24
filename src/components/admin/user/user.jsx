'use client';

import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import url from '@/routes/url';
import { userService } from '@/services/api/Users/UserService';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import Pagination from '@/components/pagination/Pagination';
import { Button, Modal } from 'react-bootstrap';

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);

  const router = useRouter();
  const deleteButtonRef = useRef(null);

  const fetchData = async (page = 0, resultsPerPage = 10) => {
    try {
      const data = await userService.list(page, resultsPerPage);
      setUsers(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao buscar usuários.');
    }
  };

  useEffect(() => {
    fetchData(currentPage, resultsPerPage);
  }, [currentPage, resultsPerPage]);

  useEffect(() => {
    if (showConfirmModal) {
      deleteButtonRef.current.focus();
    }
  }, [showConfirmModal]);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const handleResultsPerPageChange = (event) => {
    setResultsPerPage(Number(event.target.value));
    setCurrentPage(0);
  };

  const handleEdit = (user) => {
    router.push(url.admin.usuario.editar(user.id));
  };

  const handleDelete = async (userId) => {
    try {
      await userService.delete(userId);
      showSuccessMessage('Usuário excluído com sucesso.');
      fetchData(currentPage, resultsPerPage);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao excluir usuário.');
    }
  };

  const getResultMessage = () => {
    const start = currentPage * resultsPerPage + 1;
    const end = Math.min((currentPage + 1) * resultsPerPage, totalResults);
    return `Exibindo ${start} a ${end} usuários de ${totalResults} resultados`;
  };

  const handleAddUser = () => {
    router.push(url.admin.usuario.adicionar);
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
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
        <h1 className="mb-0">{'Usuários'}</h1>
        <button className="btn btn-success" onClick={handleAddUser}>
          Adicionar Usuário
        </button>
      </div>
      {successMessage && (
        <AlertMessage type="success" message={successMessage} onClose={hideSuccessMessage} />
      )}
      {error && (
        <AlertMessage type="error" message={error} onClose={hideError} />
      )}
      <div>
        <div className="row mb-3">
          <div className="col-md-4 d-flex align-items-center">
            <label htmlFor="resultsPerPage" className="me-2">Exibindo</label>
            <input
              type="number"
              id="resultsPerPage"
              value={resultsPerPage}
              onChange={handleResultsPerPageChange}
              className="form-control"
              style={{ width: '60px' }}
            />
            <span className="ms-2 text-reset">resultados por página</span>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
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
                    <button
                      className="btn btn-primary btn-sm me-1"
                      onClick={() => handleEdit(user)}
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
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          getResultMessage={getResultMessage}
        />
      </div>

      {showConfirmModal && (
        <Modal show={showConfirmModal}
          onHide={handleCancelDelete}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          Tem certeza de que deseja excluir esse usuário?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelDelete}>
            Cancelar
            </Button>
            <Button
              variant="danger"
              ref={deleteButtonRef}
              onClick={handleConfirmDelete}
            >
            Excluir
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
