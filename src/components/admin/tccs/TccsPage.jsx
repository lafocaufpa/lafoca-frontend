'use client';

import React, { useState, useEffect, useRef } from 'react';
import url from '@/routes/url';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { tccService } from '@/services/api/tcc/TccService';
import { linesOfResearchService } from '@/services/api/linesOfResearch/LinesOfResearchService';
import { MemberService } from '@/services/api/Members/MembersService';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import InputField from '@/components/inputField/InputField';
import Link from 'next/link';
import AsyncSelect from '@/components/asyncSelectV2/AsyncSelect';
import Pagination from '@/components/pagination/Pagination';
import { Button, Modal } from 'react-bootstrap';
import LoadingWrapper from '@/components/loadingWrapper/LoadingWrapper';

export default function TccsPage() {
  const [tccs, setTccs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [tccToDelete, setTccToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [urlTcc, setUrlTcc] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [lineId, setLineId] = useState(null);
  const [abstractText, setAbstractText] = useState('');
  const [selectedLinesOfResearch, setSelectedLinesOfResearch] = useState([]);
  const [selectedMember, setSelectedMember] = useState([]);
  const [tccDate, setTccDate] = useState('');
  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);

  const router = useRouter();
  const deleteButtonRef = useRef(null);

  const fetchData = async (page = 0, resultsPerPage = 5, title = '', lineOfResearchId = '') => {
    try {
      setLoading(true);
      const data = await tccService.list(page, resultsPerPage, undefined, title, lineOfResearchId);
      setTccs(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao buscar TCCs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, resultsPerPage, searchTerm, lineId?.value);
  }, [currentPage, resultsPerPage, searchTerm, lineId]);

  useEffect(() => {
    setCurrentPage(0);
  }, [lineId, searchTerm]);

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

  const handleResultsPerPageChange = (event) => {
    setResultsPerPage(Number(event.target.value));
    setCurrentPage(0);
  };

  const handleEdit = (tccData) => {
    router.push(url.admin.tccs.editar(tccData.id));

  };

  const handleDelete = async (tccId) => {
    try {
      await tccService.delete(tccId);
      showSuccessMessage('TCC excluído com sucesso.');
      fetchData(currentPage, resultsPerPage, searchTerm, lineId?.value);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao excluir TCC.');
    }
  };

  const getResultMessage = () => {
    const start = currentPage * resultsPerPage + 1;
    const end = Math.min((currentPage + 1) * resultsPerPage, totalResults);
    return `Exibindo ${start} a ${end} TCCs de ${totalResults} resultados`;
  };

  const confirmDelete = (tccId) => {
    setTccToDelete(tccId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmModal(false);
    if (tccToDelete) {
      await handleDelete(tccToDelete);
      setTccToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setTccToDelete(null);
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleAddTccSubmit = async () => {
    const tccData = {
      title,
      url: urlTcc,
      date: formatDate(tccDate),
      abstractText,
      lineOfResearchIds: selectedLinesOfResearch.map(line => line.value),
      nameMember: selectedMember?.label,
      slugMember: selectedMember?.value
    };

    try {
      await tccService.add(tccData);
      setTitle('');
      setUrlTcc('');
      setTccDate('');
      setShowAddModal(false);
      showSuccessMessage('TCC adicionado com sucesso!');
      fetchData(currentPage, resultsPerPage, searchTerm);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao adicionar TCC.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
        <h1 className="mb-0">{'Tccs'}</h1>
        <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
          Adicionar TCC
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
          <div className='col-md-4'>
            <AsyncSelect
              loadOptions={loadOptions}
              placeholder="Selecione uma linha de pesquisa"
              service={linesOfResearchService}
              value={lineId}
              onChange={setLineId}
              additional={{ page: 0 }}
              id="lineId"
              label="Linha de Pesquisa"
              required
            />
          </div>
          <div className="col-md-4">
            <InputField
              label="Buscar por título"
              type="text"
              id="searchTerm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              isSearch
            />
          </div>
        </div>
        <LoadingWrapper loading={loading}>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Título</th>
                  <th>Acesso</th>
                  <th>Data de Defesa</th>
                  <th className='text-center'>Ações</th>
                </tr>
              </thead>
              <tbody>
                {tccs.map((tccData) => (
                  <tr key={tccData.id}>
                    <td>{tccData.title}</td>
                    <td><Link className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" href={tccData.url} target='_blank' rel="noreferrer">Link</Link></td>
                    <td>{tccData.date}</td>
                    <td className='text-center'>
                      <button
                        className="btn btn-primary btn-sm me-1"
                        onClick={() => handleEdit(tccData)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => confirmDelete(tccData.id)}
                      >
                        Deletar
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
      {showConfirmModal && (
        <Modal show={showConfirmModal}
          onHide={handleCancelDelete}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza de que deseja excluir este tcc?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelDelete}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              ref={deleteButtonRef}
              onClick={handleConfirmDelete}
            >
              Excluir
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {showAddModal && (

        <Modal
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          centered
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTccSubmit();
            }
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Tcc</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
              value={urlTcc}
              onChange={(e) => setUrlTcc(e.target.value)}
              maxLength={700}
              required
            />
            <InputField
              label="Data do TCC"
              type="date"
              id="tccDate"
              value={tccDate}
              onChange={(e) => setTccDate(e.target.value)}
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
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleAddTccSubmit}>
              Adicionar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
