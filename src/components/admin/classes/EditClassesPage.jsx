'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';
import { classService } from '@/services/api/yearClass/YearClasses';

export default function EditClassPage({ turmaId }) {
  const [year, setYear] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const classe = await classService.readById(turmaId);
        setYear(classe.year);
      } catch (error) {
        setError(error?.userMessage || 'Erro ao carregar dados da turma.');
      }
    };

    fetchClassData();
  }, [turmaId]);

  const handleUpdate = async () => {
    setLoading(true);
    const data = { year: parseInt(year) };

    try {
      await classService.update(turmaId, data);
      setShow(false);
      setLoading(false);
      router.back();
    } catch (error) {
      setError(error?.userMessage || 'Erro ao atualizar turma.');
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
        <Modal.Title>Editar Turma</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <form>
          <InputField
            label="Ano"
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
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
