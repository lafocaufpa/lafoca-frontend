'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';
import { articleService } from '@/services/api/article/ArticleService';
import { linesOfResearchService } from '@/services/api/linesOfResearch/LinesOfResearchService';
import { MemberService } from '@/services/api/Members/MembersService';
import useNotification from '@/components/notification/useNotification';
import AsyncSelect from '@/components/asyncSelectV2/AsyncSelect';
import InputField from '@/components/inputField/InputField';
import YearSelect from '@/components/admin/adminSelects/YearSelect';

import 'bootstrap/dist/css/bootstrap.min.css';
export default function EditArticle({ articleId }) {
  const [title, setTitle] = useState('');
  const [journal, setJournal] = useState('');
  const [url, setUrl] = useState('');
  const [date, setDate] = useState(null);
  const [abstractText, setAbstractText] = useState('');
  const [selectedLinesOfResearch, setSelectedLinesOfResearch] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [externalMemberName, setExternalMemberName] = useState('');
  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const article = await articleService.readById(articleId);
        setTitle(article?.title);
        setJournal(article?.journal);
        setUrl(article?.url);
        setAbstractText(article?.abstractText);
        setDate({ value: article?.date, label: article?.date }),
        setSelectedLinesOfResearch(article.linesOfResearch.map(line => ({ value: line.id, label: line.name })));
        setSelectedMembers(article?.members.map(member => ({value: member.slug, label: member.name})));
      } catch (error) {
        showError(error?.userMessage || 'Erro ao carregar artigo.');
      }
    };

    fetchArticle();
  }, [articleId]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);

    const articleData = {
      title,
      journal,
      url,
      abstractText,
      date: date?.value,
      lineOfResearchIds: selectedLinesOfResearch.map(line => line.value),
      members: selectedMembers.map(member => ({
        name: member.label,
        slug: member.value && member.value.startsWith('external') ? null : member.value,
      })),
    };

    try {
      await articleService.update(articleId, articleData);
      showSuccessMessage('Artigo editado com sucesso!');
      setShow(false);
      router.back();
    } catch (error) {
      showError(error?.userMessage || 'Erro ao editar artigo.');
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

  return (
    <Modal 
      show={show} 
      onHide={handleClose}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleUpdate(e);
        }
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar Artigo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputField
          label="Título"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <InputField
          label="Jornal"
          type="text"
          id="journal"
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          required
        />
        <InputField
          label="Resumo"
          type="text"
          id="abstractText"
          as="textarea"
          value={abstractText}
          onChange={(e) => setAbstractText(e.target.value)}
          maxLength={5000}
          required
        />
        <InputField
          label="Link de Acesso"
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)} 
          maxLength={700}
          required
        />
        <YearSelect
          id="yearClassId"
          label="Ano de publicação"
          value={date}
          onChange={setDate}
          placeholder="Selecione o ano"
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
