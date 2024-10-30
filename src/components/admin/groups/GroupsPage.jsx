'use client';

import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { groupService } from '@/services/api/groups/GroupService';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import InputField from '@/components/inputField/InputField';
import url from '@/routes/url';
import PermissionsPage from '../permissions/PermissionsPage';
import { permissionService } from '@/services/api/permission/PermissionService';
import Pagination from '@/components/pagination/Pagination';
import LoadingWrapper from '@/components/loadingWrapper/LoadingWrapper';
import AsyncSelect from '@/components/asyncSelectV2/AsyncSelect';

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);

  const router = useRouter();
  const deleteButtonRef = useRef(null);

  const fetchData = async (page = 0, resultsPerPage = 5, name = '') => {
    try {
      setLoading(true);
      const data = await groupService.list(page, resultsPerPage, 'name,asc', name);
      setGroups(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao buscar grupos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, resultsPerPage, searchTerm);
  }, [currentPage, resultsPerPage, searchTerm]);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  useEffect(() => {
    if (showConfirmModal) {
      deleteButtonRef.current.focus();
    }
  }, [showConfirmModal]);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
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

  const handleResultsPerPageChange = (event) => {
    setResultsPerPage(Number(event.target.value));
    setCurrentPage(0);
  };

  const handleEdit = (group) => {
    router.push(url.admin.seguranca.editar(group.id));
  };

  const handleDelete = async (groupId) => {
    try {
      await groupService.delete(groupId);
      showSuccessMessage('Grupo excluído com sucesso.');
      fetchData(currentPage, resultsPerPage, searchTerm);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao excluir grupo.');
    }
  };

  const getResultMessage = () => {
    const start = currentPage * resultsPerPage + 1;
    const end = Math.min((currentPage + 1) * resultsPerPage, totalResults);
    return `Exibindo ${start} a ${end} de ${totalResults} resultados`;
  };


  const handleConfirmDelete = async () => {
    setShowConfirmModal(false);
    if (groupToDelete) {
      await handleDelete(groupToDelete);
      setGroupToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setGroupToDelete(null);
  };

  const handleCancelAdd = () => {
    setShowAddModal(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleConfirmDelete();
    }
  };

  const handleAddGroupSubmit = async () => {
    const groupData = {
      name,
      permissionsId: selectedPermissions.map(permission => permission.value),
      description
    };

    try {
      await groupService.add(groupData);
      setName('');
      setShowAddModal(false);
      showSuccessMessage('Grupo adicionado com sucesso!');
      fetchData(currentPage, resultsPerPage, searchTerm);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao adicionar grupo.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
        <h1 className="mb-0">Grupos</h1>
        <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
          Adicionar Grupo
        </button>
      </div>
      {successMessage && (
        <AlertMessage type="success" message={successMessage} onClose={hideSuccessMessage} />
      )}
      {error && (
        <AlertMessage type="error" message={error} onClose={hideError} />
      )}
      <div>
        <div className="row mb-3">
          <div className="col-md-4 d-flex align-items-center">
            <label htmlFor="resultsPerPage" className="me-2">Exibindo</label>
            <input
              type="number"
              id="resultsPerPage"
              value={resultsPerPage}
              onChange={handleResultsPerPageChange}
              className="form-control"
              style={{ width: '60px' }}
            />
            <span className="ms-2 text-reset">resultados por página</span>
          </div>
          <div className="col-md-4">
            <InputField
              label="Buscar por Nome"
              type="text"
              id="searchTerm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <LoadingWrapper loading={loading}>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Nome</th>
                  <th>Permissões de Acesso</th>
                  <th>Descrição do Grupo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => (
                  <tr key={group.id}>
                    <td>{group.name}</td>
                    <td>{group.permissions.map((permission) => permission.name).join(', ')}</td>
                    <td>{group.description}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-1"
                        onClick={() => handleEdit(group)}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </LoadingWrapper>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          getResultMessage={getResultMessage}
        />
      </div>
      <PermissionsPage />
      {showAddModal && (
        <div className="modal show fade" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Adicionar Grupo</h5>
                <button type="button" className="btn-close" onClick={handleCancelAdd}></button>
              </div>
              <div className="modal-body">
                <form>
                  <InputField
                    label="Nome"
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
                  <InputField
                    label="Descrição do Grupo"
                    type="text"
                    id="grupo"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={50}
                    required
                  />
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelAdd}>Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={handleAddGroupSubmit}>Adicionar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="modal show fade" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Exclusão</h5>
                <button type="button" className="btn-close" onClick={handleCancelDelete}></button>
              </div>
              <div className="modal-body">
                <p>Tem certeza que deseja excluir este grupo?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelDelete}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                  ref={deleteButtonRef}
                  onKeyDown={handleKeyDown}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
