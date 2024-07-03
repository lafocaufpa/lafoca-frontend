'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputField from '@/components/inputField/InputField'; // Importe o componente de campo de input adequado
import { useRouter } from 'next/navigation';
import { functionService } from '@/services/api/function/FunctionService';

export default function EditFunction({ functionId }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true); // Estado para controlar a visibilidade do modal
  const router = useRouter();

  useEffect(() => {
    const fetchFunctionData = async () => {
      try {
        const func = await functionService.readById(functionId);
        setName(func.name);
        setDescription(func.description);
      } catch (error) {
        setError(error?.userMessage || 'Erro ao carregar dados do membro de função.');
      }
    };

    fetchFunctionData();
  }, [functionId]);

  const handleUpdate = async () => {
    setLoading(true);
    const data = { name, description };

    try {
      await functionService.update(functionId, data);
      setShow(false);
      setLoading(false);
      router.back();
    } catch (error) {
      setError(error?.userMessage || 'Erro ao atualizar membro de função.');
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
        <Modal.Title>Editar Membro de Função</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <form>
          <InputField
            label="Nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <InputField
            label="Descrição"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
