'use client';

import { MemberService } from '@/services/api/Members/MembersService';
import { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import url from '@/routes/url';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';

export default function MemberPage() {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [showDeletedAlert, setShowDeletedAlert] = useState(false);

  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);

  const router = useRouter();
  const deleteButtonRef = useRef(null);

  const fetchData = async (page = 0, resultsPerPage = 10) => {
    try {
      const data = await MemberService.list(page, resultsPerPage);
      setMembers(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      showError(error.message || 'Erro ao buscar membros.');
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

  useEffect(() => {
    if (showDeletedAlert) {
      const timer = setTimeout(() => {
        setShowDeletedAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showDeletedAlert]);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const handleResultsPerPageChange = (event) => {
    setResultsPerPage(Number(event.target.value));
    setCurrentPage(0);
  };

  const handleEdit = (member) => {
    router.push(url.admin.membro.editar(member.id));
  };

  const handleDelete = async (memberId) => {
    try {
      await MemberService.delete(memberId);
      showSuccessMessage('Membro excluído com sucesso.');
      fetchData(currentPage, resultsPerPage);
    } catch (error) {
      showError(error.message || 'Erro ao excluir membro.');
    }
  };

  const getResultMessage = () => {
    const start = currentPage * resultsPerPage + 1;
    const end = Math.min((currentPage + 1) * resultsPerPage, totalResults);
    return `Exibindo ${start} a ${end} membros de ${totalResults} resultados`;
  };

  const handleAddMember = () => {
    router.push(url.admin.membro.adicionar);
  };

  const confirmDelete = (memberId) => {
    setMemberToDelete(memberId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmModal(false);
    if (memberToDelete) {
      await handleDelete(memberToDelete);
      setMemberToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setMemberToDelete(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleConfirmDelete();
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
        <h1 className="mb-0">Configurações de Membros</h1>
        <button className="btn btn-success" onClick={handleAddMember}>Adicionar Membro</button>
      </div>
      {successMessage && (
        <AlertMessage type="success" message={successMessage} onClose={hideSuccessMessage} />
      )}
      {error && (
        <AlertMessage type="error" message={error} onClose={hideError} />
      )}
      {error ? (
        <div className="alert alert-danger">Erro ao buscar membros: {error}</div>
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center">
              <label htmlFor="resultsPerPage" className="d-inline-block mb-0 me-2">Mostrando</label>
              <input
                type="number"
                id="resultsPerPage"
                value={resultsPerPage}
                onChange={handleResultsPerPageChange}
                className="form-control d-inline-block me-2"
                style={{ width: '60px' }}
              />
              <span className="text-reset">resultados por página</span>
            </div>
            <span className="text-reset">{getResultMessage()}</span>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Nome Completo</th>
                  <th>Função</th>
                  <th>Email</th>
                  <th>Ano de Entrada</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id}>
                    <td>{member.fullName}</td>
                    <td>{member.function}</td>
                    <td>{member.email}</td>
                    <td>{member.yearClass}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-1"
                        onClick={() => handleEdit(member)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => confirmDelete(member.id)}
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

      {showConfirmModal && (
        <div className="modal show fade" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Exclusão</h5>
              </div>
              <div className="modal-body">
                <p>Tem certeza que deseja excluir este membro?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>Cancelar</button>
                <button
                  ref={deleteButtonRef}
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                  onKeyDown={handleKeyDown}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
