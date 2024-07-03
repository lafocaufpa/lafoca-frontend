'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputField from '@/components/inputField/InputField';
import { useRouter } from 'next/navigation';
import { skillService } from '@/services/api/skill/SkillService';

export default function EditSkill({ skillId }) {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [originalPhoto, setOriginalPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSkillData = async () => {
      try {
        const skill = await skillService.readById(skillId);
        setName(skill.name);
        if (skill.urlPhoto) {
          setPhoto(skill.urlPhoto);
          setOriginalPhoto(skill.urlPhoto);
        }
      } catch (error) {
        setError(error?.userMessage || 'Erro ao carregar dados da habilidade.');
      }
    };

    fetchSkillData();
  }, [skillId]);

  const handleUpdate = async () => {
    setLoading(true);
    const data = { name };

    try {
      await skillService.update(skillId, data);
      if (photo && photo !== originalPhoto) {
        await skillService.addPhoto(skillId, photo);
      }
      setShow(false);
      setLoading(false);
      router.back();
    } catch (error) {
      setError(error?.userMessage || 'Erro ao atualizar habilidade.');
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleRemovePhoto = async () => {
    try {
      await skillService.removePhoto(skillId);
      setPhoto(null);
    } catch (error) {
      setError(error?.userMessage || 'Erro ao remover a foto.');
    }
  };

  const handleClose = () => {
    setShow(false);
    router.back();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Habilidade</Modal.Title>
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
          <div className="form-group mb-3">
            <label htmlFor="photo" className="fw-bold mb-1">Selecione uma foto</label>
            <input
              type="file"
              className="form-control"
              id="photo"
              onChange={handleFileChange}
            />
            {photo && typeof photo === 'string' && (
              <div className="mt-3">
                <img src={photo} alt="Foto atual" style={{ width: '100%' }} />
                <button type="button" className="btn btn-danger mt-3" onClick={handleRemovePhoto}>
                  Remover Foto
                </button>
              </div>
            )}
          </div>
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
