'use client';

import React, { useState, useEffect, useRef } from 'react';
import url from '@/routes/url';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { tccService } from '@/services/api/tcc/TccService';
import { linesOfResearchService } from '@/services/api/linesOfResearch/LinesOfResearchService';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import InputField from '@/components/inputField/InputField';
import Link from 'next/link';
import AsyncSelect from '@/components/asyncSelectV2/AsyncSelect';
import HeaderPageCms from '../HeaderPageCms/HeaderPageCms';
import IconTccs from '@/components/icon/IconTccs';

export default function TccsPage() {
  const [tccs, setTccs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [tccToDelete, setTccToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [urlTcc, setUrlTcc] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [lineId, setLineId] = useState(null);
  const [selectedLinesOfResearch, setSelectedLinesOfResearch] = useState([]);
  const [tccDate, setTccDate] = useState('');
  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);

  const router = useRouter();
  const deleteButtonRef = useRef(null);

  const fetchData = async (page = 0, resultsPerPage = 5, name = '', lineOfResearchId = '') => {
    try {
      const data = await tccService.list(page, resultsPerPage, undefined, name, lineOfResearchId);
      setTccs(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao buscar TCCs.');
    }
  };

  useEffect(() => {
    fetchData(currentPage, resultsPerPage, searchTerm, lineId?.value);
  }, [currentPage, resultsPerPage, searchTerm, lineId]);


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

  const handleEdit = (tccData) => {
    router.push(url.admin.tccs.editar(tccData.id));

  };

  const handleDelete = async (tccId) => {
    try {
      await tccService.delete(tccId);
      showSuccessMessage('TCC excluído com sucesso.');
      fetchData(currentPage, resultsPerPage, searchTerm, lineId?.value);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao excluir TCC.');
    }
  };

  const getResultMessage = () => {
    const start = currentPage * resultsPerPage + 1;
    const end = Math.min((currentPage + 1) * resultsPerPage, totalResults);
    return `Exibindo ${start} a ${end} TCCs de ${totalResults} resultados`;
  };

  const confirmDelete = (tccId) => {
    setTccToDelete(tccId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmModal(false);
    if (tccToDelete) {
      await handleDelete(tccToDelete);
      setTccToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setTccToDelete(null);
  };

  const handleCancelAdd = () => {
    setShowAddModal(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleConfirmDelete();
    }
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleAddTccSubmit = async () => {
    const tccData = {
      name,
      url: urlTcc,
      date: formatDate(tccDate),
      lineOfResearchIds: selectedLinesOfResearch.map(line => line.value),
    };

    try {
      await tccService.add(tccData);
      setName('');
      setUrlTcc('');
      setTccDate('');
      setShowAddModal(false);
      showSuccessMessage('TCC adicionado com sucesso!');
      fetchData(currentPage, resultsPerPage, searchTerm);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao adicionar TCC.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
        <h1 className="mb-0">{'Tccs'}</h1>
        <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
          Adicionar TCC
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
              label="Buscar por título"
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
                <th>Acesso</th>
                <th>Data de Defesa</th>
                <th className='text-center'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tccs.map((tccData) => (
                <tr key={tccData.id}>
                  <td>{tccData.name}</td>
                  <td><Link className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" href={tccData.url}  target='_blank' rel="noreferrer">Link</Link></td>
                  <td>{new Date(tccData.date).toLocaleDateString()}</td>
                  <td className='text-center'>
                    <button
                      className="btn btn-primary btn-sm me-1"
                      onClick={() => handleEdit(tccData)}
                    >
                        Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => confirmDelete(tccData.id)}
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
          <div className="text-muted">{getResultMessage()}</div>
        </div>
      </div>
      {showConfirmModal && (
        <div
          className="modal fade show"
          style={{ display: 'block' }}
          tabIndex="-1"
          aria-labelledby="confirmModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="confirmModalLabel">Confirmar Exclusão</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleCancelDelete}
                ></button>
              </div>
              <div className="modal-body">
                Tem certeza de que deseja excluir este TCC?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={
                    handleCancelDelete}
                >
                      Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  ref={deleteButtonRef}
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
    
      {showAddModal && (
        <div
          className="modal fade show"
          style={{ display: 'block' }}
          tabIndex="-1"
          aria-labelledby="addModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addModalLabel">Adicionar TCC</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleCancelAdd}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <InputField
                    label="Título"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={255}
                    required
                  />
                  <InputField
                    label="Url"
                    type="text"
                    id="url"
                    value={urlTcc}
                    onChange={(e) => setUrlTcc(e.target.value)}
                    maxLength={700}
                    required
                  />
                  <InputField
                    label="Data do TCC"
                    type="date"
                    id="tccDate"
                    value={tccDate}
                    onChange={(e) => setTccDate(e.target.value)}
                    required
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
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelAdd}
                >
                      Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddTccSubmit}
                >
                      Adicionar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
    