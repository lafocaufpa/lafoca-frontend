'use client';

import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { linesOfResearchService } from '@/services/api/linesOfResearch/LinesOfResearchService';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import url from '@/routes/url';
import InputField from '@/components/inputField/InputField'; // Importando componente de campo de input

export default function LinesOfResearchPage() {
  const [linesOfResearch, setLinesOfResearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
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
      const data = await linesOfResearchService.list(page, resultsPerPage, 'name,asc', name);
      setLinesOfResearch(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao buscar linhas de pesquisa.');
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

  const handleCancelAdd = () => {
    setShowAddModal(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleConfirmDelete();
    }
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
      setShowAddModal(false); // Após adicionar com sucesso, fecha o modal
      showSuccessMessage('Linha de pesquisa adicionada com sucesso!');
      fetchData(currentPage, resultsPerPage, searchTerm);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao adicionar linha de pesquisa.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
        <h1 className="mb-0">Linhas de Pesquisa</h1>
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
            />
          </div>
        </div>
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
        <div className="d-flex justify-content-between align-items-center">
          <nav aria-label="Page navigation">
            <ul className="pagination mb-0">
              <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  aria-label="Previous"
                >
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
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  aria-label="Next"
                >
                    &raquo;
                </button>
              </li>
            </ul>
          </nav>
          <span className="text-reset">{getResultMessage()}</span>
        </div>
      </div>

      {showAddModal && (
        <div className="modal show fade" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Adicionar Linha de Pesquisa</h5>
                <button type="button" className="btn-close" onClick={handleCancelAdd}></button>
              </div>
              <div className="modal-body">
                <form>
                  <InputField
                    label="Nome"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <InputField
                    label="Descrição"
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleAddLineSubmit}>
                  Adicionar
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {showConfirmModal && (
        <div className="modal show fade" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Exclusão</h5>
                <button type="button" className="btn-close" onClick={handleCancelDelete}></button>
              </div>
              <div className="modal-body">
                <p>Tem certeza que deseja excluir esta linha de pesquisa?</p>
              </div>
              <div className="modal-footer">
                <button
                  ref={deleteButtonRef}
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                  onKeyDown={handleKeyDown}
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
