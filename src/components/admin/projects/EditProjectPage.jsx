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
import { MemberService } from '@/services/api/Members/MembersService';
import YearSelect from '@/components/admin/adminSelects/YearSelect';
import { Form } from 'react-bootstrap';

export default function EditProject({ projectId }) {
  const [title, setTitle] = useState('');
  const [modality, setModality] = useState(false);
  const [abstractText, setAbstractText] = useState('');
  const [date, setDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedLinesOfResearch, setSelectedLinesOfResearch] = useState([]);
  const [externalMemberName, setExternalMemberName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
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
        setAbstractText(project?.abstractText);
        setDate({ value: project?.date, label: project?.date } || null);
        setEndDate({ value: project?.date, label: project?.endDate }|| null);
        setModality(project?.modality || '');
        setSelectedLinesOfResearch(project.linesOfResearch.map(line => ({ value: line.id, label: line.name })));
        setSelectedMembers(project.members.map(member => ({value: member.slug, label: member.name})));
      } catch (error) {
        showError(error?.userMessage || 'Erro ao carregar projeto.');
      }
    };

    fetchProject();
  }, [projectId]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);

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
      await projectsService.update(projectId, projectData);
      showSuccessMessage('Projeto editado com sucesso!');
      setShow(false);
      router.back();
    } catch (error) {
      showError(error?.userMessage || 'Erro ao editar projeto.');
    } finally {
      setLoading(false);
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
    <Modal 
      show={show} 
      onHide={handleClose} 
      centered
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleUpdate(e);
        }
      }}
    >
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
          id="yearClassId"
          label="Ano de Início"
          value={date}
          onChange={setDate}
          placeholder="Selecione o ano"
        />
        <YearSelect
          id="yearClassId"
          label="Ano de fim"
          value={endDate}
          onChange={setEndDate}
          placeholder="Selecione o ano"
        />
        <Form.Group controlId="modality" className="mb-3">
          <Form.Label className="fw-bold mb-1">Modalidade</Form.Label>
          <Form.Control
            as="select"
            value={modality}
            onChange={(e) => setModality(e.target.value)}
            required
          >
            <option style={{ color: 'hsl(0, 0%, 50%)' }} value="">
                Selecione a Modalidade
            </option>
            <option value="PESQUISA">Pesquisa</option>
            <option value="ENSINO">Ensino</option>
            <option value="EXTENSÃO">Extensão</option>
          </Form.Control>
        </Form.Group>
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
        <InputField
          label="Nome do Membro Externo"
          type="text" 
          id="externalMember"
          value={externalMemberName}
          onChange={(e) => setExternalMemberName(e.target.value)} 
          maxLength={255}
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
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={(e) => handleUpdate(e)} disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
