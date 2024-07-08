'use client';

import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { projectsService } from '@/services/api/Projects/ProjectsService';
import { linesOfResearchService } from '@/services/api/linesOfResearch/LinesOfResearchService';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import InputField from '@/components/inputField/InputField';
import urlPath from '@/routes/url';
import AsyncSelect from '@/components/asyncSelectV2/AsyncSelect';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [completed, setCompleted] = useState(false);
  const [selectedLinesOfResearch, setSelectedLinesOfResearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [lineId, setLineId] = useState(null);
  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);

  const router = useRouter();
  const deleteButtonRef = useRef(null);

  const fetchData = async (page = 0, resultsPerPage = 5, searchTerm = '', lineOfResearchId = '') => {
    try {
      const data = await projectsService.list(page, resultsPerPage, 'title,asc', searchTerm, lineOfResearchId);
      setProjects(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao buscar projetos.');
    }
  };

  useEffect(() => {
    fetchData(currentPage, resultsPerPage, searchTerm, lineId?.value);
  }, [currentPage, resultsPerPage, searchTerm, lineId]);

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

  const handleEdit = (project) => {
    router.push(urlPath.admin.projetos.editar(project.id));
  };

  const handleDelete = async (projectId) => {
    try {
      await projectsService.delete(projectId);
      showSuccessMessage('Projeto excluído com sucesso.');
      fetchData(currentPage, resultsPerPage, searchTerm, lineId?.value);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao excluir projeto.');
    }
  };

  const getResultMessage = () => {
    const start = currentPage * resultsPerPage + 1;
    const end = Math.min((currentPage + 1) * resultsPerPage, totalResults);
    return `Exibindo ${start} a ${end} projetos de ${totalResults} resultados`;
  };

  const confirmDelete = (projectId) => {
    setProjectToDelete(projectId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmModal(false);
    if (projectToDelete) {
      await handleDelete(projectToDelete);
      setProjectToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setProjectToDelete(null);
  };

  const handleCancelAdd = () => {
    setShowAddModal(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleConfirmDelete();
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
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

  const handleAddProjectSubmit = async () => {
    const projectData = {
      title,
      description,
      completed,
      year,
      lineOfResearchIds: selectedLinesOfResearch.map(line => line.value),
    };

    try {
      await projectsService.add(projectData);
      setTitle('');
      setDescription('');
      setYear('');
      setShowAddModal(false);
      showSuccessMessage('Projeto adicionado com sucesso!');
      fetchData(currentPage, resultsPerPage, searchTerm);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao adicionar projeto.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
        <h1 className="mb-0">Projetos</h1>
        <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
          Adicionar Projeto
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
          <div className='col-md-4'>
            <AsyncSelect
              loadOptions={loadOptions}
              placeholder="Selecione uma linha de pesquisa"
              service={linesOfResearchService}
              value={lineId}
              onChange={setLineId}
              additional={{ page: 0 }}
              id="lineId"
              label="Linha de Pesquisa"
              required
            />
          </div>
          <div className="col-md-4">
            <InputField
              label="Buscar por Título"
              type="text"
              id="searchTerm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              isSearch
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Título</th>
                <th>Descrição</th>
                <th>Ano</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{truncateText(project.description, 250)}</td>
                  <td>{project.year}</td>
                  <td  style={{ minWidth: '137px' } }>
                    <button
                      className="btn btn-primary btn-sm me-1"
                      onClick={() => handleEdit(project)}
                    >
                        Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => confirmDelete(project.id)}
                    >
                            Excluir
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
          <div className="result-message">{getResultMessage()}</div>
        </div>
      </div>
      {showAddModal && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Adicionar Projeto</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleCancelAdd}></button>
              </div>
              <div className="modal-body">
                <InputField
                  label="Título"
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <InputField
                  label="Descrição"
                  type="text"
                  id="description"
                  as="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={1000}
                  required
                />
                <InputField
                  label="Ano"
                  type="text"
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                />
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id='completed'
                    checked={completed}
                    onChange={() => setCompleted(!completed)}
                  />
                  <label className="fw-bold mb-1" htmlFor='completed'>
              Concluído
                  </label>
                </div>
                <AsyncSelect
                  loadOptions={loadOptions}
                  placeholder="Selecione linhas de pesquisa"
                  service={linesOfResearchService}
                  value={selectedLinesOfResearch}
                  onChange={setSelectedLinesOfResearch}
                  additional={{ page: 0 }}
                  isMulti
                  id="linesOfResearch"
                  label="Linhas de Pesquisa"
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelAdd}>
                      Cancelar
                </button>
                <button type="button" className="btn btn-primary" onClick={handleAddProjectSubmit}>
                      Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    
      {showConfirmModal && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog" onKeyDown={handleKeyDown}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Exclusão</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleCancelDelete}></button>
              </div>
              <div className="modal-body">
                <p>Tem certeza de que deseja excluir este projeto?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>
                      Cancelar
                </button>
                <button type="button" className="btn btn-danger" ref={deleteButtonRef} onClick={handleConfirmDelete}>
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
    