'use client';

import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { classService } from '@/services/api/yearClass/YearClasses';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import url from '@/routes/url';
import Pagination from '@/components/pagination/Pagination';
import { Button, Modal } from 'react-bootstrap';
import InputField from '@/components/inputField/InputField';

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
    console.log(classData);
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          getResultMessage={getResultMessage}
        />
      </div>

      {showConfirmModal && (
        <Modal show={showConfirmModal} 
          onHide={handleCancelDelete} 
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          Tem certeza de que deseja excluir esta turma?
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

      {showAddModal && (
        <Modal
          show={showAddModal}
          onHide={handleCancelAdd}
          centered
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddClassSubmit();
            }
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Turma</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputField
              label="Ano"
              type="number"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              maxLength={4}
              required
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelAdd}>
           Cancelar
            </Button>
            <Button variant="success" onClick={handleAddClassSubmit}>
           Adicionar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
