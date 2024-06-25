'use client';

import React, { useState, useRef } from 'react';
import { MemberService } from '@/services/api/Members/MembersService';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageCropProvider from '@/providers/ImageCropProvider';
import ImageCrop from '@components/admin/ImageCrop/ImageCrop';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import InputField from '@components/inputField/InputField';

const formatDate = (date) => {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

export default function AddMember() {
  const [fullName, setFullName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [biography, setBiography] = useState('');
  const [yearClassId, setYearClassId] = useState('');
  const [functionMemberId, setFunctionMemberId] = useState('');
  const [linkPortifolio, setLinkPortifolio] = useState('');
  const [linkLinkedin, setLinkLinkedin] = useState('');
  const [tccName, setTccName] = useState('');
  const [tccUrl, setTccUrl] = useState('');
  const [tccDate, setTccDate] = useState('');
  const [skillsId, setSkillsId] = useState('');
  const [articlesId, setArticlesId] = useState('');
  const [projectsId, setProjectsId] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);
  const imageCropRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    hideError();

    const memberData = {
      fullName,
      displayName,
      email,
      description,
      biography,
      yearClassId: parseInt(yearClassId),
      functionMemberId: parseInt(functionMemberId),
      linkPortifolio,
      linkLinkedin,
      tcc: {
        name: tccName,
        url: tccUrl,
        date: formatDate(tccDate),
      },
      skillsId: skillsId.split(',').map(id => parseInt(id.trim())),
      articlesId: articlesId.split(',').map(id => parseInt(id.trim())),
      projectsId: projectsId.split(',').map(id => id.trim()),
    };

    try {
      const newMember = await MemberService.add(memberData);
      if (photo) {
        await MemberService.addPhoto(newMember.id, photo);
      }
      setFullName('');
      setDisplayName('');
      setEmail('');
      setDescription('');
      setBiography('');
      setYearClassId('');
      setFunctionMemberId('');
      setLinkPortifolio('');
      setLinkLinkedin('');
      setTccName('');
      setTccUrl('');
      setTccDate('');
      setSkillsId('');
      setArticlesId('');
      setProjectsId('');
      setPhoto(null);

      if (imageCropRef.current) {
        imageCropRef.current.resetImageCrop();
      }

      showSuccessMessage('Membro adicionado com sucesso!');

    } catch (error) {
      showError(error.userMessage || 'Erro ao adicionar membro.');
    }
  };

  const handleRemovePhoto = async () => {
    if (imageCropRef.current) {
      imageCropRef.current.resetImageCrop();
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto p-4" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Adicionar Membro</h2>
        {successMessage && (
          <AlertMessage type="success" message={successMessage} onClose={hideSuccessMessage} />
        )}
        {error && (
          <AlertMessage type="error" message={error} onClose={hideError} />
        )}
        <form onSubmit={handleSubmit}>
          <InputField
            label="Nome Completo"
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <InputField
            label="Nome de Exibição"
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
          <InputField
            label="Email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            label="Descrição"
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <InputField
            label="Biografia"
            type="text"
            id="biography"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            required
          />
          <InputField
            label="ID da Classe Anual"
            type="number"
            id="yearClassId"
            value={yearClassId}
            onChange={(e) => setYearClassId(e.target.value)}
            required
          />
          <InputField
            label="ID da Função do Membro"
            type="number"
            id="functionMemberId"
            value={functionMemberId}
            onChange={(e) => setFunctionMemberId(e.target.value)}
            required
          />
          <InputField
            label="Link do Portfólio"
            type="url"
            id="linkPortifolio"
            value={linkPortifolio}
            onChange={(e) => setLinkPortifolio(e.target.value)}
            required
          />
          <InputField
            label="Link do LinkedIn"
            type="url"
            id="linkLinkedin"
            value={linkLinkedin}
            onChange={(e) => setLinkLinkedin(e.target.value)}
            required
          />
          <InputField
            label="Nome do TCC"
            type="text"
            id="tccName"
            value={tccName}
            onChange={(e) => setTccName(e.target.value)}
            required
          />
          <InputField
            label="URL do TCC"
            type="url"
            id="tccUrl"
            value={tccUrl}
            onChange={(e) => setTccUrl(e.target.value)}
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
            label="IDs de Habilidades (separados por vírgula)"
            type="text"
            id="skillsId"
            value={skillsId}
            onChange={(e) => setSkillsId(e.target.value)}
            required
          />
          <InputField
            label="IDs de Artigos (separados por vírgula)"
            type="text"
            id="articlesId"
            value={articlesId}
            onChange={(e) => setArticlesId(e.target.value)}
            required
          />
          <InputField
            label="IDs de Projetos (separados por vírgula)"
            type="text"
            id="projectsId"
            value={projectsId}
            onChange={(e) => setProjectsId(e.target.value)}
            required
          />
          <div className="form-group mb-3">
            <div className='d-flex justify-content-center align-items-center flex-column'>
              <label htmlFor="photo" className="fw-bold mb-1">Selecione uma foto</label>
              <ImageCropProvider>
                <ImageCrop photo={photo} setPhoto={setPhoto} ref={imageCropRef} />
              </ImageCropProvider>
              {photo && (
                <button type="button" className="btn btn-danger mt-3" onClick={handleRemovePhoto}>
                  Remover Foto
                </button>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">Adicionar Membro</button>
        </form>
      </div>
    </div>
  );
}
