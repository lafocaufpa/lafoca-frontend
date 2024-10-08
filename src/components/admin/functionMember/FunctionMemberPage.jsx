'use client';

import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { functionService } from '@/services/api/function/FunctionService';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import InputField from '@/components/inputField/InputField';
import url from '@/routes/url';
import Pagination from '@/components/pagination/Pagination';
import LoadingWrapper from '@/components/loadingWrapper/LoadingWrapper';
import { Button, Modal } from 'react-bootstrap';

export default function FunctionMemberPage() {
  const [functionMembers, setFunctionMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);

  const router = useRouter();
  const deleteButtonRef = useRef(null);

  const fetchData = async (page = 0, resultsPerPage = 5, name = '') => {
    try {
      setLoading(true);
      const data = await functionService.list(page, resultsPerPage, 'name,asc', name);
      setFunctionMembers(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao buscar membros de função.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, resultsPerPage, searchTerm);
  }, [currentPage, resultsPerPage, searchTerm]);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

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

  const handleEdit = (functionMember) => {
    router.push(url.admin.funcoes.editar(functionMember.id));
  };

  const handleDelete = async (memberId) => {
    try {
      await functionService.delete(memberId);
      showSuccessMessage('Membro de função excluído com sucesso.');
      fetchData(currentPage, resultsPerPage, searchTerm);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao excluir membro de função.');
    }
  };

  const getResultMessage = () => {
    const start = currentPage * resultsPerPage + 1;
    const end = Math.min((currentPage + 1) * resultsPerPage, totalResults);
    return `Exibindo ${start} a ${end} membros de função de ${totalResults} resultados`;
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

  const handleAddFuncMemberSubmit = async () => {
    const memberData = {
      name,
      description,
    };

    try {
      await functionService.add(memberData);
      setName('');
      setDescription('');
      setShowAddModal(false);
      showSuccessMessage('Membro de função adicionado com sucesso!');
      fetchData(currentPage, resultsPerPage, searchTerm);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao adicionar membro de função.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
        <h1 className="mb-0">{'Funções de Membros'}</h1>
        <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
          Adicionar Membro de Função
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
          <div className="col-md-4">
            <InputField
              label="Buscar por Nome"
              type="text"
              id="searchTerm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              isSearch
            />
          </div>
        </div>
        <LoadingWrapper loading={loading}>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {functionMembers.map((member) => (
                  <tr key={member.id}>
                    <td>{member.name}</td>
                    <td>{member.description}</td>
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
      {showAddModal && (
        <Modal
          show={showAddModal}
          onHide={() => {
            setShowAddModal(false);
          }}
          centered
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddFuncMemberSubmit();
            }
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Função de Membro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputField
              label="Nome da Função"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={225}
              required
            />
            <InputField
              label="Descrição da Função"
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={225}
              required
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
              setShowAddModal(false);
            }}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleAddFuncMemberSubmit}>
              Adicionar
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {showConfirmModal && (
        <Modal show={showConfirmModal}
          onHide={handleCancelDelete}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza de que deseja excluir esta função?
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
