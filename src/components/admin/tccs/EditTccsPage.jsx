'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputField from '@/components/inputField/InputField';
import { useRouter } from 'next/navigation';
import { tccService } from '@/services/api/tcc/TccService';
import { linesOfResearchService } from '@/services/api/linesOfResearch/LinesOfResearchService';
import { MemberService } from '@/services/api/Members/MembersService';
import AsyncSelect from '@/components/asyncSelectV2/AsyncSelect';

export default function EditTccsPage({ tccId }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [date, setDate] = useState('');
  const [abstractText, setAbstractText] = useState('');
  const [error, setError] = useState(null);
  const [selectedLinesOfResearch, setSelectedLinesOfResearch] = useState([]);
  const [selectedMember, setSelectedMember] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTccData = async () => {
      try {
        const tcc = await tccService.readById(tccId);
        setTitle(tcc.title);
        setUrl(tcc.url);
        setDate(parseDate(tcc.date));
        setAbstractText(tcc.abstractText);
        setSelectedLinesOfResearch(tcc.linesOfResearch.map(line => ({ value: line.id, label: line.name })));
        setSelectedMember({ value: tcc.slugMember, label: tcc.nameMember });
      } catch (error) {
        setError(error?.userMessage || 'Erro ao carregar dados do TCC.');
      }
    };

    fetchTccData();
  }, [tccId]);

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


  const handleUpdate = async () => {
    setLoading(true);
    const data = {
      title,
      url,
      date: formatDate(date),
      abstractText,
      lineOfResearchIds: selectedLinesOfResearch.map(line => line.value),
      nameMember: selectedMember?.label,
      slugMember: selectedMember?.value
    };

    try {
      await tccService.update(tccId, data);
      setShow(false);
      setLoading(false);
      router.back();
    } catch (error) {
      setError(error?.userMessage || 'Erro ao atualizar TCC.');
      setLoading(false);
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
          handleUpdate();
        }
      }}>
      <Modal.Header closeButton>
        <Modal.Title>Editar TCC</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
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
          label="Url"
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          maxLength={700}
          required
        />
        <InputField
          label="Data do TCC"
          type="date"
          id="tccDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <InputField
          label="Resumo"
          type="text"
          id="abstractText"
          as='textarea'
          maxLength={5000}
          value={abstractText}
          onChange={(e) => setAbstractText(e.target.value)}
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
        <AsyncSelect
          loadOptions={loadMemberOptions}
          placeholder="Selecione um membro"
          service={MemberService}
          value={selectedMember}
          onChange={setSelectedMember}
          additional={{ page: 0 }}
          id="collab"
          label="Vincular membro"
          required
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleUpdate} disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const formatDate = (date) => {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

function parseDate(dateString) {
  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
}
