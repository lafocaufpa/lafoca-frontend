'use client';
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputField from '@/components/inputField/InputField';
import { useRouter } from 'next/navigation';

import { linesOfResearchService } from '@/services/api/linesOfResearch/LinesOfResearchService';

export default function EditLine({ lineId }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchLineData = async () => {
      try {
        const line = await linesOfResearchService.readById(lineId);
        setName(line.name);
        setDescription(line.description);
      } catch (error) {
        setError(error?.userMessage || 'Erro ao carregar dados da linha de pesquisa.');
      }
    };

    fetchLineData();
  }, [lineId]);

  const handleUpdate = async () => {
    setLoading(true);
    const data = { name, description };

    try {
      await linesOfResearchService.update(lineId, data);
      setShow(false);
      setLoading(false);
      router.back();
    } catch (error) {
      setError(error?.userMessage || 'Erro ao atualizar linha de pesquisa.');
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false); 
    router.back();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Linha de Pesquisa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <form>
          <InputField
            label="Nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            maxLength={50} 
            required
          />
          <InputField
            label="Descrição"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
            maxLength={225}
            required
          />
        </form>
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
