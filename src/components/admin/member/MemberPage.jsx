'use client';

import { MemberService } from '@/services/api/Members/MembersService';
import { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import url from '@/routes/url';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import InputField from '@/components/inputField/InputField';
import Pagination from '@/components/pagination/Pagination';
import SelectYear from '@/components/asyncSelectV2/SelectYear';
import LoadingWrapper from '@/components/loadingWrapper/LoadingWrapper';

export default function MemberPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const data = await MemberService.list(page, resultsPerPage, 'fullName,asc', fullName, yearClassId);
      setMembers(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao buscar membros.');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData(currentPage, resultsPerPage, searchQuery, yearClassId?.value);
  }, [currentPage, resultsPerPage, searchQuery, yearClassId]);

  useEffect(() => {
    setCurrentPage(0);
  }, [yearClassId, searchQuery]);

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
            <SelectYear
              id={'year'}
              label={'Selecione a Turma'}
              placeholder={'Filtrar por ano'}
              value={yearClassId}
              onChange={setYearClassId}
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
        <LoadingWrapper loading={loading}>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Nome Completo</th>
              <th>Função</th>
              <th>E-mail</th>
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
    </LoadingWrapper>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          getResultMessage={getResultMessage}
        />
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
