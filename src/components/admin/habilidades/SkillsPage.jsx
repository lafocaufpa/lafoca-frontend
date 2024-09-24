'use client';

import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { skillService } from '@/services/api/skill/SkillService';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import InputField from '@/components/inputField/InputField';
import url from '@/routes/url';
import Image from 'next/image';
import Pagination from '@/components/pagination/Pagination';
import { Button, Modal } from 'react-bootstrap';

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);

  const router = useRouter();

  const fetchData = async (page = 0, resultsPerPage = 5, name = '') => {
    try {
      const data = await skillService.list(page, resultsPerPage, 'name,asc', name);
      setSkills(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao buscar habilidades.');
    }
  };

  useEffect(() => {
    fetchData(currentPage, resultsPerPage, searchTerm);
  }, [currentPage, resultsPerPage, searchTerm]);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const handleResultsPerPageChange = (event) => {
    setResultsPerPage(Number(event.target.value));
    setCurrentPage(0);
  };

  const handleEdit = (skill) => {
    router.push(url.admin.habilidades.editar(skill.id));
  };

  const handleDelete = async (skillId) => {
    try {
      await skillService.delete(skillId);
      showSuccessMessage('Habilidade excluída com sucesso.');
      fetchData(currentPage, resultsPerPage, searchTerm);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao excluir habilidade.');
    }
  };

  const getResultMessage = () => {
    const start = currentPage * resultsPerPage + 1;
    const end = Math.min((currentPage + 1) * resultsPerPage, totalResults);
    return `Exibindo ${start} a ${end} habilidades de ${totalResults} resultados`;
  };

  const confirmDelete = (skillId) => {
    setSkillToDelete(skillId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmModal(false);
    if (skillToDelete) {
      await handleDelete(skillToDelete);
      setSkillToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setSkillToDelete(null);
  };

  const handleAddSkillSubmit = async () => {
    const skillData = {
      name
    };

    try {
      const newSkill = await skillService.add(skillData);
      if (photo) {
        await skillService.addPhoto(newSkill.id, photo);
      }
      setName('');
      setShowAddModal(false);
      showSuccessMessage('Habilidade adicionada com sucesso!');
      fetchData(currentPage, resultsPerPage, searchTerm);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao adicionar habilidade.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
        <h1 className="mb-0">{'Habilidades'}</h1>
        <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
          Adicionar Habilidade
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
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Imagem</th>
                <th>Nome</th>
                <th className='text-center'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id}>
                  <td>
                    {skill.skillPictureUrl ? <Image src={skill?.skillPictureUrl} alt={skill.name} width={30} height={30} /> : null}
                  </td>
                  <td>{skill.name}</td>
                  <td className='text-center'>
                    <button
                      className="btn btn-primary btn-sm me-1"
                      onClick={() => handleEdit(skill)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => confirmDelete(skill.id)}
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
            Tem certeza de que deseja excluir esta habilidade?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelDelete}>
              Cancelar
            </Button>
            <Button
              variant="danger"
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
          onHide={() => {
            setShowAddModal(false);
          }}
          centered
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddSkillSubmit();
            }
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Turma</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputField
              label="Nome da Habilidade"
              type="text"
              id="nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              required
            />
            <InputField
              label={'Nome da Habilidade'}
              type={'file'} id={'photo'}
              onChange={(e) => setPhoto(e.target.files[0])} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {setShowAddModal(false)}}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleAddSkillSubmit}>
              Adicionar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
