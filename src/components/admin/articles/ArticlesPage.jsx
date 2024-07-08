'use client';

import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { articleService } from '@/services/api/article/ArticleService';
import { linesOfResearchService } from '@/services/api/linesOfResearch/LinesOfResearchService';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import InputField from '@/components/inputField/InputField';
import urlPath from '@/routes/url';
import Link from 'next/link';
import AsyncSelect from '@/components/asyncSelectV2/AsyncSelect';

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [journal, setJournal] = useState('');
  const [url, setUrl] = useState('');
  const [selectedLinesOfResearch, setSelectedLinesOfResearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [lineId, setLineId] = useState(null);
  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);

  const router = useRouter();
  const deleteButtonRef = useRef(null);

  const fetchData = async (page = 0, resultsPerPage = 5, searchTerm = '', lineOfResearchId = '') => {
    try {
      const data = await articleService.list(page, resultsPerPage, 'title,asc', searchTerm, lineOfResearchId);
      setArticles(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao buscar artigos.');
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

  const handleEdit = (article) => {
    router.push(urlPath.admin.artigos.editar(article.id));
  };

  const handleDelete = async (articleId) => {
    try {
      await articleService.delete(articleId);
      showSuccessMessage('Artigo excluído com sucesso.');
      fetchData(currentPage, resultsPerPage, searchTerm, lineId?.value);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao excluir artigo.');
    }
  };

  const getResultMessage = () => {
    const start = currentPage * resultsPerPage + 1;
    const end = Math.min((currentPage + 1) * resultsPerPage, totalResults);
    return `Exibindo ${start} a ${end} artigos de ${totalResults} resultados`;
  };

  const confirmDelete = (articleId) => {
    setArticleToDelete(articleId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmModal(false);
    if (articleToDelete) {
      await handleDelete(articleToDelete);
      setArticleToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setArticleToDelete(null);
  };

  const handleCancelAdd = () => {
    setShowAddModal(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleConfirmDelete();
    }
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

  const handleAddArticleSubmit = async () => {
    const articleData = {
      title,
      journal,
      url,
      lineOfResearchIds: selectedLinesOfResearch.map(line => line.value),

    };

    try {
      await articleService.add(articleData);
      setTitle('');
      setJournal('');
      setUrl('');
      setShowAddModal(false);
      showSuccessMessage('Artigo adicionado com sucesso!');
      fetchData(currentPage, resultsPerPage, searchTerm);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao adicionar artigo.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
        <h1 className="mb-0">Artigos</h1>
        <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
          Adicionar Artigo
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
                <th>Jornal</th>
                <th>URL</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id}>
                  <td>{article.title}</td>
                  <td>{article.journal}</td>
                  <td><Link className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" href={article.url}  target='_blank' rel="noreferrer">Link</Link></td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-1"
                      onClick={() => handleEdit(article)}
                    >
                        Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => confirmDelete(article.id)}
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
          <div className="result-message">{getResultMessage()}</div>
        </div>
      </div>

      {showAddModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Adicionar Artigo</h5>
                <button type="button" className="btn-close" onClick={handleCancelAdd}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Título
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="journal" className="form-label">
                      Jornal
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="journal"
                      value={journal}
                      onChange={(e) => setJournal(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="url" className="form-label">
                      URL
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                  <AsyncSelect
                    loadOptions={loadOptions}
                    service={linesOfResearchService}
                    placeholder="Selecione linhas de pesquisa"
                    label="Linhas de Pesquisa"
                    isMulti
                    value={selectedLinesOfResearch}
                    onChange={setSelectedLinesOfResearch}
                    additional={{ page: 0 }}
                    id="selectedLinesOfResearch"
                    required
                  />
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelAdd}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-primary" onClick={handleAddArticleSubmit}>
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Exclusão</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCancelDelete}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Tem certeza que deseja excluir este artigo?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                  onKeyDown={handleKeyDown}
                  ref={deleteButtonRef}
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
