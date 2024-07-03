'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';
import { projectsService } from '@/services/api/Projects/ProjectsService';
import { linesOfResearchService } from '@/services/api/linesOfResearch/LinesOfResearchService';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import AsyncSelect from '@/components/asyncSelectV2/AsyncSelect';
import InputField from '@/components/inputField/InputField';

export default function EditProject({ projectId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [year, setYear] = useState(''); // New state for project year
  const [selectedLinesOfResearch, setSelectedLinesOfResearch] = useState([]);
  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const project = await projectsService.readById(projectId);
        setTitle(project?.title);
        setDescription(project?.description);
        setCompleted(project?.completed || false);
        setYear(project?.year || '');
        setSelectedLinesOfResearch(project.linesOfResearch.map(line => ({ value: line.id, label: line.name })));
      } catch (error) {
        showError(error?.userMessage || 'Erro ao carregar projeto.');
      }
    };

    fetchProject();
  }, [projectId]);

  const handleProjectSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const projectData = {
      title,
      description,
      completed,
      year,
      lineOfResearchIds: selectedLinesOfResearch.map(line => line.value),
    };

    try {
      await projectsService.update(projectId, projectData);
      showSuccessMessage('Projeto editado com sucesso!');
      setShow(false);
      router.back();
    } catch (error) {
      console.log(error);
      showError(error?.userMessage || 'Erro ao editar projeto.');
    } finally {
      setLoading(false);
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
        additional: { page: page + 1 },
      };
    } catch (error) {
      console.error('Error fetching options:', error);
      return { options: [], hasMore: false };
    }
  };

  const handleClose = () => {
    setShow(false);
    router.back();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Projeto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {successMessage && (
          <AlertMessage type="success" message={successMessage} onClose={hideSuccessMessage} />
        )}
        {error && (
          <AlertMessage type="error" message={error} onClose={hideError} />
        )}
        <form onSubmit={handleProjectSubmit}>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleProjectSubmit} disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
