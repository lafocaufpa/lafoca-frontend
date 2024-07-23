'use client';

import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { articleService } from '@/services/api/article/ArticleService';
import { linesOfResearchService } from '@/services/api/linesOfResearch/LinesOfResearchService';
import { MemberService } from '@/services/api/Members/MembersService';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import InputField from '@/components/inputField/InputField';
import urlPath from '@/routes/url';
import Link from 'next/link';
import AsyncSelect from '@/components/asyncSelectV2/AsyncSelect';
import Pagination from '@/components/pagination/Pagination';
import YearSelect from '@/components/lineOfResearchSelect/YearSelect';

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
  const [date, setDate] = useState(null);
  const [journal, setJournal] = useState('');
  const [abstractText, setAbstractText] = useState('');
  const [url, setUrl] = useState('');
  const [selectedLinesOfResearch, setSelectedLinesOfResearch] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [externalMemberName, setExternalMemberName] = useState('');
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
    setCurrentPage(0);
  }, [lineId, searchTerm]);

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

  const loadMemberOptions = async (service, inputValue, loadedOptions, { page }) => {
    try {
      const response = await service.list(page, 5, undefined, inputValue, undefined);
      return {
        options: response.content.map(member => ({
          value: member.slug,
          label: member.fullName,
        })),
        hasMore: !response.lastPage,
        additional: {
          page: page + 1,
        },
      };
    } catch (error) {
      console.error('Erro ao carregar membros:', error);
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
      date: date?.value,
      abstractText,
      lineOfResearchIds: selectedLinesOfResearch.map(line => line.value),
      members: selectedMembers.map(member => ({
        name: member.label,
        slug: member.value,
      })),
    };

    try {
      await articleService.add(articleData);
      setTitle('');
      setJournal('');
      setUrl('');
      setDate(null);
      setAbstractText('');
      setShowAddModal(false);
      setSelectedMembers([]);
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
                <th>Revista</th>
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          getResultMessage={getResultMessage}
        />
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
                  <InputField
                    label="Título"
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <InputField
                    label="Revista"
                    type="text"
                    id="journal"
                    value={journal}
                    onChange={(e) => setJournal(e.target.value)}
                    required
                  />
                  <InputField
                    label="Resumo"
                    type="text"
                    id="articleAbstract"
                    as="textarea"
                    value={abstractText}
                    onChange={(e) => setAbstractText(e.target.value)}
                    maxLength={5000}
                    required
                  />
                  <InputField
                    label="Link de Acesso"
                    type="text"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                  <YearSelect
                    placeholder="Selecione o ano da publicação"
                    value={date}
                    onChange={setDate}
                    id="year"
                  />
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
                  <AsyncSelect
                    loadOptions={loadMemberOptions}
                    placeholder="Selecione colaboradores"
                    service={MemberService}
                    value={selectedMembers}
                    onChange={setSelectedMembers}
                    additional={{ page: 0 }}
                    isMulti
                    id="collab"
                    label="Adicionar colaboradores"
                    required
                  />
                  <label htmlFor="externalMember" className="fw-bold mb-1">Adicionar Membro Externo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="externalMember"
                    value={externalMemberName}
                    onChange={(e) => setExternalMemberName(e.target.value)}
                    placeholder="Nome do Membro Externo"
                  />
                  <button
                    type="button"
                    className="btn btn-secondary mt-2"
                    onClick={() => {
                      if (externalMemberName.trim()) {
                        setSelectedMembers([...selectedMembers, { label: externalMemberName, value: null }]);
                        setExternalMemberName('');
                      }
                    }}
                  >
                  Adicionar Membro Externo
                  </button>
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
