'use client';

import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { projectsService } from '@/services/api/Projects/ProjectsService';
import { linesOfResearchService } from '@/services/api/linesOfResearch/LinesOfResearchService';
import { MemberService } from '@/services/api/Members/MembersService';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import InputField from '@/components/inputField/InputField';
import urlPath from '@/routes/url';
import AsyncSelect from '@/components/asyncSelectV2/AsyncSelect';
import YearSelect from '@/components/admin/adminSelects/YearSelect';
import Pagination from '@/components/pagination/Pagination';
import { Button, Form, Modal } from 'react-bootstrap';
import LoadingWrapper from '@/components/loadingWrapper/LoadingWrapper';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [abstractText, setAbstractText] = useState('');
  const [date, setDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [modality, setModality] = useState('');
  const [selectedLinesOfResearch, setSelectedLinesOfResearch] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [allCollaborators, setAllCollaborators] = useState([]);
  const [externalMemberName, setExternalMemberName] = useState('');
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [lineId, setLineId] = useState(null);
  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);

  const router = useRouter();
  const deleteButtonRef = useRef(null);

  const fetchData = async (page = 0, resultsPerPage = 5, searchTerm = '', lineOfResearchId = '') => {
    try {
      setLoading(true);
      const data = await projectsService.list(page, resultsPerPage, 'title,asc', searchTerm, lineOfResearchId);
      setProjects(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao buscar projetos.');
    } finally {
      setLoading(false);
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

  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return `${text?.substring(0, maxLength)}...`;
    }
    return text;
  };


  const loadOptions = async (service, inputValue, loadedOptions, { page }) => {
    try {
      const response = await service.list(page, 5, undefined, inputValue);
      return {
        options: response.content.map(item => ({
          value: item.id,
          label: item.name || item.title || item.year || item.fullName,
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

  const handleAddProjectSubmit = async () => {
    const projectData = {
      title,
      abstractText,
      date: date?.value || null,
      endDate: endDate?.value || null,
      modality: modality || null,
      lineOfResearchIds: selectedLinesOfResearch.map(line => line.value),
      members: selectedMembers.map(member => ({
        name: member.label,
        slug: member.value && member.value.startsWith('external') ? null : member.value,
      })),
    };

    try {
      await projectsService.add(projectData);
      setTitle('');
      setAbstractText('');
      setDate(null);
      setEndDate(null);
      setModality('');
      setSelectedLinesOfResearch([]);
      setSelectedMembers([]);
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
        <LoadingWrapper loading={loading}>
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
                    <td>{truncateText(project.abstractText, 250)}</td>
                    <td>{project.year}</td>
                    <td style={{ minWidth: '137px' }}>
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
          onHide={() => setShowAddModal(false)}
          centered
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddProjectSubmit();
            }
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Projeto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputField
              label="Título"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={255}
              required
            />
            <InputField
              label="Descrição"
              type="text"
              id="description"
              as="textarea"
              value={abstractText}
              onChange={(e) => setAbstractText(e.target.value)}
              maxLength={5000}
              required
            />
            <YearSelect
              label={'Ano de início'}
              placeholder="Ano de início"
              value={date}
              onChange={setDate}
              id="yearClassId"
            />
            <YearSelect
              label={'Ano de fim'}
              placeholder="Ano de fim"
              value={endDate}
              onChange={setEndDate}
              id="yearClassId"
            />
            <Form.Group controlId="modality" className="mb-3">
              <Form.Label className="fw-bold mb-1">Modalidade</Form.Label>
              <Form.Control
                as="select"
                value={modality}
                onChange={(e) => setModality(e.target.value)}
                placeholder='Selecione a Modalidade'
                required
              >
                <option key='blankChoice' hidden value />
                <option value="PESQUISA">Pesquisa</option>
                <option value="ENSINO">Ensino</option>
                <option value="EXTENSÃO">Extensão</option>
              </Form.Control>
            </Form.Group>
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
            <InputField
              label={'Nome do Membro Externo'}
              type="text"
              id="externalMember"
              value={externalMemberName}
              onChange={(e) => setExternalMemberName(e.target.value)}
              maxLength={255}
              placeholder="Nome do Membro Externo"
            />
            <Button
              variant="success"
              onClick={() => {
                if (externalMemberName.trim()) {
                  setSelectedMembers([...selectedMembers, { label: externalMemberName, value: ('external-' + new Date().getMilliseconds()) }]);
                  setExternalMemberName('');
                }
              }}>
              Adicionar Membro Externo
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleAddProjectSubmit}>
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
            Tem certeza de que deseja excluir este Projeto?
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
