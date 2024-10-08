'use client';

import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { linesOfResearchService } from '@/services/api/linesOfResearch/LinesOfResearchService';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import url from '@/routes/url';
import InputField from '@/components/inputField/InputField';
import LoadingWrapper from '@/components/loadingWrapper/LoadingWrapper';
import Pagination from '@/components/pagination/Pagination';
import { Button, Modal } from 'react-bootstrap';

export default function LinesOfResearchPage() {
  const [linesOfResearch, setLinesOfResearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [lineToDelete, setLineToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);

  const router = useRouter();
  const deleteButtonRef = useRef(null);

  const fetchData = async (page = 0, resultsPerPage = 10, name = '') => {
    try {
      setLoading(true);
      const data = await linesOfResearchService.list(page, resultsPerPage, 'name,asc', name);
      setLinesOfResearch(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao buscar linhas de pesquisa.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, resultsPerPage, searchTerm);
  }, [currentPage, resultsPerPage, searchTerm]);

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

  const handleEdit = (line) => {
    router.push(url.admin.linhadepesquisa.editar(line.id));
  };

  const handleDelete = async (lineId) => {
    try {
      await linesOfResearchService.delete(lineId);
      showSuccessMessage('Linha de pesquisa excluída com sucesso.');
      fetchData(currentPage, resultsPerPage, searchTerm);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao excluir linha de pesquisa.');
    }
  };

  const getResultMessage = () => {
    const start = currentPage * resultsPerPage + 1;
    const end = Math.min((currentPage + 1) * resultsPerPage, totalResults);
    return `Exibindo ${start} a ${end} linhas de pesquisa de ${totalResults} resultados`;
  };

  const confirmDelete = (lineId) => {
    setLineToDelete(lineId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmModal(false);
    if (lineToDelete) {
      await handleDelete(lineToDelete);
      setLineToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setLineToDelete(null);
  };


  const handleAddLineSubmit = async () => {
    const lineData = {
      name,
      description,
    };

    try {
      await linesOfResearchService.add(lineData);
      setName('');
      setDescription('');
      setShowAddModal(false);
      showSuccessMessage('Linha de pesquisa adicionada com sucesso!');
      fetchData(currentPage, resultsPerPage, searchTerm);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao adicionar linha de pesquisa.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
        <h1 className="mb-0">{'Linhas de Pesquisa'}</h1>
        <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
          Adicionar Linha de Pesquisa
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
                {linesOfResearch.map((line) => (
                  <tr key={line.id}>
                    <td>{line.name}</td>
                    <td>{line.description}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-1"
                        onClick={() => handleEdit(line)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => confirmDelete(line.id)}
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
              handleAddLineSubmit();
            }
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Linha de Pesquisa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputField
              label="Nome da Linha de Pesquisa"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              required
            />
            <InputField
              label="Descrição da Linha de Pesquisa"
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={225}
              required
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleAddLineSubmit}>
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
            Tem certeza de que deseja excluir esta linha de pesquisa?
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
