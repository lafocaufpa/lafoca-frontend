'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputField from '@/components/inputField/InputField';
import { useRouter } from 'next/navigation';
import { tccService } from '@/services/api/tcc/TccService';

export default function EditTccsPage({ tccId }) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTccData = async () => {
      try {
        const tcc = await tccService.readById(tccId);
        setName(tcc.name);
        setUrl(tcc.url);
        setDate(parseDate(tcc.date)); 
      } catch (error) {
        setError(error?.userMessage || 'Erro ao carregar dados do TCC.');
      }
    };

    fetchTccData();
  }, [tccId]);

  const handleUpdate = async () => {
    setLoading(true);
    const data = { name, url, date: formatDate(date) };

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
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar TCC</Modal.Title>
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
            label="URL"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
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

const formatDate = (date) => {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

function parseDate(dateString) {
  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
}
