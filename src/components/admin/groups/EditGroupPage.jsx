'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';
import { groupService } from '@/services/api/groups/GroupService';
import { permissionService } from '@/services/api/permission/PermissionService';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import AsyncSelect from '@/components/asyncSelectV2/AsyncSelect';
import InputField from '@/components/inputField/InputField';

export default function EditGroup({ groupId }) {
  const [name, setName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const group = await groupService.readById(groupId);
        setName(group?.name);
        setSelectedPermissions(group.permissions.map(permission => ({ value: permission.id, label: permission.name })));
      } catch (error) {
        showError(error?.userMessage || 'Erro ao carregar grupo.');
      }
    };

    fetchGroup();
  }, [groupId]);

  const handleGroupSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const groupData = {
      name,
      permissionsId: selectedPermissions.map(permission => permission.value),
    };

    try {
      await groupService.update(groupId, groupData);
      showSuccessMessage('Grupo editado com sucesso!');
      setShow(false);
      router.back();
    } catch (error) {
      showError(error?.userMessage || 'Erro ao editar grupo.');
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
          label: item.name,
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
        <Modal.Title>Editar Grupo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {successMessage && (
          <AlertMessage type="success" message={successMessage} onClose={hideSuccessMessage} />
        )}
        {error && (
          <AlertMessage type="error" message={error} onClose={hideError} />
        )}
        <form onSubmit={handleGroupSubmit}>
          <InputField
            label="Nome do Grupo"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            maxLength={255}
            required
          />
          <AsyncSelect
            loadOptions={loadOptions}
            service={permissionService}
            placeholder="Selecione permissões"
            label="Permissões"
            isMulti
            value={selectedPermissions}
            onChange={setSelectedPermissions}
            additional={{ page: 0 }}
            id="selectedPermissions"
            required
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleGroupSubmit} disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
