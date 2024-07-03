'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';
import { articleService } from '@/services/api/article/ArticleService';
import { linesOfResearchService } from '@/services/api/linesOfResearch/LinesOfResearchService';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import AsyncSelect from '@/components/asyncSelectV2/AsyncSelect';
import InputField from '@/components/inputField/InputField';

export default function EditArticle({ articleId }) {
  const [title, setTitle] = useState('');
  const [journal, setJournal] = useState('');
  const [url, setUrl] = useState('');
  const [selectedLinesOfResearch, setSelectedLinesOfResearch] = useState([]);
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
        setSelectedLinesOfResearch(article.linesOfResearch.map(line => ({ value: line.id, label: line.name })));
      } catch (error) {
        showError(error?.userMessage || 'Erro ao carregar artigo.');
      }
    };

    fetchArticle();
  }, [articleId]);

  const handleArticleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const articleData = {
      title,
      journal,
      url,
      lineOfResearchIds: selectedLinesOfResearch.map(line => line.value),
    };

    try {
      await articleService.update(articleId, articleData);
      showSuccessMessage('Artigo editado com sucesso!');
      setShow(false);
      router.back();
    } catch (error) {
      console.log(error);
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

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Artigo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {successMessage && (
          <AlertMessage type="success" message={successMessage} onClose={hideSuccessMessage} />
        )}
        {error && (
          <AlertMessage type="error" message={error} onClose={hideError} />
        )}
        <form onSubmit={handleArticleSubmit}>
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
            label="URL"
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleArticleSubmit} disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
