'use client';

import { MemberService } from '@/services/api/Members/MembersService';
import { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import url from '@/routes/url';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import AsyncSelect from '@/components/asyncSelectV2/AsyncSelect';
import { classService } from '@/services/api/yearClass/YearClasses';
import InputField from '@/components/inputField/InputField';
import IconMembers from '@/components/icon/IconMembers';
import HeaderPageCms from '../HeaderPageCms/HeaderPageCms';

export default function MemberPage() {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [yearClassId, setYearClassId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);

  const router = useRouter();
  const deleteButtonRef = useRef(null);

  const fetchData = async (page = 0, resultsPerPage = 10, fullName = '', yearClassId = '') => {
    try {
      const data = await MemberService.list(page, resultsPerPage, 'fullName,asc', fullName, yearClassId);
      setMembers(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao buscar membros.');
    }
  };

  useEffect(() => {
    fetchData(currentPage, resultsPerPage, searchQuery, yearClassId?.value);
  }, [currentPage, resultsPerPage, searchQuery, yearClassId]);

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

  const handleEdit = (member) => {
    router.push(url.admin.membro.editar(member.id));
  };

  const handleDelete = async (memberId) => {
    try {
      await MemberService.delete(memberId);
      showSuccessMessage('Membro excluído com sucesso.');
      fetchData(currentPage, resultsPerPage, searchQuery, yearClassId?.value);

    } catch (error) {
      showError(error?.userMessage || 'Erro ao excluir membro.');
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

  const loadOptions = async (service, inputValue, loadedOptions, { page }) => {
    try {
      const response = await service.list(page, 5, undefined, inputValue);
      return {
        options: response.content.map(item => ({
          value: item.id,
          label: item.name || item.title || item.year,
        })),
        hasMore: !response.lastPage,
        additional: {
          page: page + 1,
        },
      };
    } catch (error) {
      console.error('Error fetching options:', error);
      return {
        options: [],
        hasMore: false,
      };
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
        <h1 className="mb-0">{'Membros'}</h1>
        <button className="btn btn-success" onClick={handleAddMember}>Adicionar Membro</button>
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
          <div className="col-md-4">
            <AsyncSelect
              loadOptions={loadOptions}
              placeholder="Selecione a turma"
              service={classService}
              value={yearClassId}
              onChange={setYearClassId}
              additional={{ page: 0 }}
              id="yearClassId"
              label="Ano da Turma"
              required
            />
          </div>
          <div className="col-md-4">
            <InputField
              label="Buscar por Nome"
              type="text"
              id="searchTerm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
              isSearch={true}
            />
          </div>
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
          <div className="result-message">{getResultMessage()}</div>
        </div>
      </div>

      {showConfirmModal && (
        <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Exclusão</h5>
                <button type="button" className="btn-close" onClick={handleCancelDelete}></button>
              </div>
              <div className="modal-body">
                <p>Tem certeza de que deseja excluir este membro?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                  ref={deleteButtonRef}
                >
                  Excluir
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
