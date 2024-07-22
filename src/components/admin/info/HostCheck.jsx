'use client';

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Alert, Spinner, Modal, Button, Form } from 'react-bootstrap';
import { hostCheckService } from '@/services/api/system/hostCheck';
import useNotification from '@/components/notification/useNotification';
import styles from './HostCheck.module.css';

const keyMap = {
  'Backend Host Address': 'backendHostAddress',
  'Java Version': 'backendJavaVersion',
  'JVM Total Memory (MB)': 'backendJvmTotalMemoryMB',
  'JVM Free Memory (MB)': 'backendJvmFreeMemoryMB',
  'JVM Max Memory (MB)': 'backendJvmMaxMemoryMB',
  'Spring Boot Version': 'backendSpringBootVersion',
  'Spring Version': 'backendSpringVersion',
  'Spring Security Core Version': 'backendSpringSecurityCoreVersion',
  'Host Name': 'backendHostName',
  'RAM Memory': 'backendRamMemory',
  'Storage': 'backendStorage',
  'Processor Info': 'backendProcessorInfo',
  'OS Distributor': 'backendOsDistributor',
  'OS Description': 'backendOsDescription',
  'OS Release': 'backendOsRelease',
  'OS Codename': 'backendOsCodename',
  'Node Version': 'frontendNodeVersion',
  'NPM Version': 'frontendNpmVersion',
  'React Version': 'frontendReactVersion',
  'Next.js Version': 'frontendNextjsVersion',
  'NextAuth Version': 'frontendNextauthVersion',
  'Frontend Host Address': 'frontendHostAddress',
  'Frontend Host Name': 'frontendHostName',
  'Frontend RAM Memory': 'frontendRamMemory',
  'Frontend Storage': 'frontendStorage',
  'Frontend Processor Info': 'frontendProcessorInfo',
  'Frontend OS Distributor': 'frontendOsDistributor',
  'Frontend OS Description': 'frontendOsDescription',
  'Frontend OS Release': 'frontendOsRelease',
  'Frontend OS Codename': 'frontendOsCodename',
  'Database Name': 'dbName',
  'Database Version': 'dbVersion',
  'Database Status': 'dbStatus',
  'Last Backup': 'dbLastBackup',
};

const translationMap = {
  'Backend Host Address': 'Endereço do Host Backend',
  'Java Version': 'Versão do Java',
  'JVM Total Memory (MB)': 'Memória Total JVM (MB)',
  'JVM Free Memory (MB)': 'Memória Livre JVM (MB)',
  'JVM Max Memory (MB)': 'Memória Máxima JVM (MB)',
  'Spring Boot Version': 'Versão do Spring Boot',
  'Spring Version': 'Versão do Spring',
  'Spring Security Core Version': 'Versão do Spring Security Core',
  'Host Name': 'Nome do Host',
  'RAM Memory': 'Memória RAM',
  'Storage': 'Armazenamento',
  'Processor Info': 'Informações do Processador',
  'OS Distributor': 'Distribuidor do SO',
  'OS Description': 'Descrição do SO',
  'OS Release': 'Release do SO',
  'OS Codename': 'Codinome do SO',
  'Node Version': 'Versão do Node',
  'NPM Version': 'Versão do NPM',
  'React Version': 'Versão do React',
  'Next.js Version': 'Versão do Next.js',
  'NextAuth Version': 'Versão do NextAuth',
  'Frontend Host Address': 'Endereço do Host Frontend',
  'Frontend Host Name': 'Nome do Host Frontend',
  'Frontend RAM Memory': 'Memória RAM do Frontend',
  'Frontend Storage': 'Armazenamento do Frontend',
  'Frontend Processor Info': 'Informações do Processador do Frontend',
  'Frontend OS Distributor': 'Distribuidor do SO do Frontend',
  'Frontend OS Description': 'Descrição do SO do Frontend',
  'Frontend OS Release': 'Release do SO do Frontend',
  'Frontend OS Codename': 'Codinome do SO do Frontend',
  'Database Name': 'Nome do Banco de Dados',
  'Database Version': 'Versão do Banco de Dados',
  'Database Status': 'Status do Banco de Dados',
  'Last Backup': 'Último Backup',
};

export default function HostCheck() {
  const [hostInfo, setHostInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [backupFile, setBackupFile] = useState(null);

  const handleRestoreBackup = async () => {
    if (!backupFile) {
      showError('Por favor, selecione um arquivo de backup.');
      return;
    }
  
    setIsRestoring(true); // Inicia o estado de carregamento
  
    try {
      const response = await hostCheckService.restoreBackup(backupFile);
  
      alert(response);
      await fetchData();
    } catch (err) {
      showError(err.message);
    } finally {
      setIsRestoring(false); // Termina o estado de carregamento
    }
  };
  const fetchData = async () => {
    try {
      const hostData = await hostCheckService.read();
      setHostInfo(hostData);
    } catch (err) {
      showError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (key, value) => {
    setModalContent({ key, value: value !== null ? value : '' });
    setShowModal(true);
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const handleSave = async () => {
    try {
      const updatedData = { ...hostInfo, [keyMap[modalContent.key]]: modalContent.value || null };

      Object.keys(updatedData).forEach(key => {
        if (updatedData[key] === '' || updatedData[key] === undefined) {
          updatedData[key] = null;
        }
      });
      
      await hostCheckService.update(updatedData);
      fetchData();
      
      setShowModal(false);
    } catch (err) {
      showError(err.message);
    }
  };

  const handleChange = (e) => {
    setModalContent({
      ...modalContent,
      value: e.target.value,
    });
  };

  const nonEditableFields = [
    'Backend Host Address',
    'Java Version',
    'JVM Total Memory (MB)',
    'JVM Free Memory (MB)',
    'JVM Max Memory (MB)',
    'Spring Boot Version',
    'Spring Version',
    'Spring Security Core Version',
    'Database Name',
    'Database Version',
    'Database Status',
    'Last Backup'
  ];

  const renderInfo = (info) => (
    <Table striped bordered hover>
      <tbody>
        {Object.entries(info).map(([key, value]) => (
          <tr key={key}>
            <td style={{ width: '50%' }}><strong>{translationMap[key]}</strong></td>
            <td style={{ width: '20%' }}>{value !== null ? value : 'N/A'}</td>
            <td>
              {nonEditableFields.includes(key) ? (
                <Button variant="secondary" disabled>
                  Editar
                </Button>
              ) : (
                <Button variant="primary" onClick={() => handleEditClick(key, value)}>
                  Editar
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const backendInfo = {
    'Backend Host Address': hostInfo?.backendHostAddress,
    'Java Version': hostInfo?.backendJavaVersion,
    'JVM Total Memory (MB)': hostInfo?.backendJvmTotalMemoryMB,
    'JVM Free Memory (MB)': hostInfo?.backendJvmFreeMemoryMB,
    'JVM Max Memory (MB)': hostInfo?.backendJvmMaxMemoryMB,
    'Spring Boot Version': hostInfo?.backendSpringBootVersion,
    'Spring Version': hostInfo?.backendSpringVersion,
    'Spring Security Core Version': hostInfo?.backendSpringSecurityCoreVersion,
    'Host Name': hostInfo?.backendHostName,
    'RAM Memory': hostInfo?.backendRamMemory,
    'Storage': hostInfo?.backendStorage,
    'Processor Info': hostInfo?.backendProcessorInfo,
    'OS Distributor': hostInfo?.backendOsDistributor,
    'OS Description': hostInfo?.backendOsDescription,
    'OS Release': hostInfo?.backendOsRelease,
    'OS Codename': hostInfo?.backendOsCodename,
  };

  const frontendInfo = {
    'Node Version': hostInfo?.frontendNodeVersion,
    'NPM Version': hostInfo?.frontendNpmVersion,
    'React Version': hostInfo?.frontendReactVersion,
    'Next.js Version': hostInfo?.frontendNextjsVersion,
    'NextAuth Version': hostInfo?.frontendNextauthVersion,
    'Frontend Host Address': hostInfo?.frontendHostAddress,
    'Frontend Host Name': hostInfo?.frontendHostName,
    'Frontend RAM Memory': hostInfo?.frontendRamMemory,
    'Frontend Storage': hostInfo?.frontendStorage,
    'Frontend Processor Info': hostInfo?.frontendProcessorInfo,
    'Frontend OS Distributor': hostInfo?.frontendOsDistributor,
    'Frontend OS Description': hostInfo?.frontendOsDescription,
    'Frontend OS Release': hostInfo?.frontendOsRelease,
    'Frontend OS Codename': hostInfo?.frontendOsCodename,
  };


  const databaseInfo = {
    'Database Name': hostInfo?.dbName,
    'Database Version': hostInfo?.dbVersion,
    'Database Status': hostInfo?.dbStatus,
    'Last Backup': hostInfo?.dbLastBackup ? formatDateTime(hostInfo.dbLastBackup) : 'N/A',
  };

  const handleBackup = async () => {
    try {
      setIsBackingUp(true);
      const response = await hostCheckService.dbBackup();

      if (response.message) {
        showError(response.message);
      }

      await fetchData();
      setIsBackingUp(false);
    } catch (err) {
      showError(err.message);
      setIsBackingUp(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Informações do Servidor</h1>
      {error && <Alert variant="danger" onClose={hideError} dismissible>{error}</Alert>}

      <h2>Servidor Backend</h2>
      {hostInfo ? renderInfo(backendInfo) : <Spinner animation="border" />}

      <h2>Frontend</h2>
      {hostInfo ? renderInfo(frontendInfo) : <Spinner animation="border" />}

      <h2>Database</h2>
      {hostInfo ? renderInfo(databaseInfo) : <Spinner animation="border" />}

      <div className="" style={{padding: '0 20px'}}>
        <Form.Group className="mb-3">
          <Button variant="primary" className="me-3" onClick={handleBackup} disabled={isBackingUp} style={{minWidth:'20%'}}>
            {isBackingUp ? 'Fazendo Backup...' : 'Fazer Backup'}
          </Button>
          {isBackingUp && <Spinner animation="border" />}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Selecione o arquivo de backup</Form.Label>
          <Form.Control
            type="file"
            accept=".sql"
            onChange={e => setBackupFile(e.target.files[0])}
            className="mb-3"
          />
          <Button variant="success" onClick={handleRestoreBackup} disabled={!backupFile || isRestoring} style={{minWidth:'20%'}}>
            {isRestoring ? 'Restaurando...' : 'Restaurar Backup'}
          </Button>
          {isRestoring && <Spinner animation="border" />}
        </Form.Group>


      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar {translationMap[modalContent.key]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicValue">
              <Form.Label>{translationMap[modalContent.key]}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o valor"
                value={modalContent.value}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
