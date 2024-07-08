'use client';

import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { classService } from '@/services/api/yearClass/YearClasses';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import url from '@/routes/url';
import HeaderPageCms from '../HeaderPageCms/HeaderPageCms';
import IconClasses from '@/components/icon/IconClasses';

export default function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [year, setYear] = useState('');
  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);

  const router = useRouter();
  const deleteButtonRef = useRef(null);

  const fetchData = async (page = 0, resultsPerPage = 5, year = '') => {
    try {
      const data = await classService.list(page, resultsPerPage, 'year,asc', year);
      setClasses(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao buscar turmas.');
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

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const handleResultsPerPageChange = (event) => {
    setResultsPerPage(Number(event.target.value));
    setCurrentPage(0);
  };

  const handleEdit = (classData) => {
    router.push(url.admin.turmas.editar(classData.id));
  };

  const handleDelete = async (classId) => {
    try {
      await classService.delete(classId);
      showSuccessMessage('Turma excluída com sucesso.');
      fetchData(currentPage, resultsPerPage);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao excluir turma.');
    }
  };

  const getResultMessage = () => {
    const start = currentPage * resultsPerPage + 1;
    const end = Math.min((currentPage + 1) * resultsPerPage, totalResults);
    return `Exibindo ${start} a ${end} turmas de ${totalResults} resultados`;
  };

  const confirmDelete = (classId) => {
    setClassToDelete(classId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmModal(false);
    if (classToDelete) {
      await handleDelete(classToDelete);
      setClassToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setClassToDelete(null);
  };

  const handleCancelAdd = () => {
    setShowAddModal(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleConfirmDelete();
    }
  };

  const handleAddClassSubmit = async () => {
    const classData = {
      year: parseInt(year),
    };

    try {
      await classService.add(classData);
      setYear('');
      setShowAddModal(false);
      showSuccessMessage('Turma adicionada com sucesso!');
      fetchData(currentPage, resultsPerPage);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao adicionar turma.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
        <h1 className="mb-0">{'Turmas'}</h1>
        <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
          Adicionar Turma
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
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Ano</th>
                <th className='text-center'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((classData) => (
                <tr key={classData.id}>
                  <td>{classData.year}</td>
                  <td className='text-center'>
                    <button
                      className="btn btn-primary btn-sm me-1"
                      onClick={() => handleEdit(classData)}
                    >
                        Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => confirmDelete(classData.id)}
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
              Tem certeza de que deseja excluir esta turma?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelDelete}
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
                <h5 className="modal-title" id="addModalLabel">Adicionar Turma</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleCancelAdd}
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="year">Ano</label>
                  <input
                    type="number"
                    id="year"
                    className="form-control"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
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
                  onClick={handleAddClassSubmit}
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
