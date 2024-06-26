'use client';

import React, { useState, useRef } from 'react';
import { MemberService } from '@/services/api/Members/MembersService';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageCropProvider from '@/providers/ImageCropProvider';
import ImageCrop from '@components/admin/ImageCrop/ImageCrop';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import InputField from '@components/inputField/InputField';
import AsyncSelect from '@/components/asyncSelect/AsyncSelect';
import { articleService } from '@/services/api/article/ArticleService';
import { projectsService } from '@/services/api/Projects/ProjectsService';
import { functionService } from '@/services/api/function/FunctionService';
import { skillService } from '@/services/api/skill/SkillService';
import { classService } from '@/services/api/yearClass/YearClasses';

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
  const [yearClassId, setYearClassId] = useState([]);
  const [functionMemberId, setFunctionMemberId] = useState([]);
  const [linkPortifolio, setLinkPortifolio] = useState('');
  const [linkLinkedin, setLinkLinkedin] = useState('');
  const [tccName, setTccName] = useState('');
  const [tccUrl, setTccUrl] = useState('');
  const [tccDate, setTccDate] = useState('');
  const [skillsId, setSkillsId] = useState([]);
  const [articlesId, setArticlesId] = useState([]);
  const [projectsId, setProjectsId] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);
  const [includeTCC, setIncludeTCC] = useState(false);
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
      yearClassId: yearClassId.map(option => parseInt(option.value)),
      functionMemberId: functionMemberId.map(option => parseInt(option.value)),
      linkPortifolio,
      linkLinkedin,
      tcc: includeTCC ? {
        name: tccName,
        url: tccUrl,
        date: formatDate(tccDate),
      } : null,
      skillsId: skillsId.map(option => parseInt(option.value)),
      articlesId: articlesId.map(option => parseInt(option.value)),
      projectsId: projectsId.map(option => option.value),
    };

    try {
      const newMember = await MemberService.add(memberData);
      if (photo) {
        await MemberService.addPhoto(newMember.id, photo);
      }
      clearFields();
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

  const clearFields = () => {
    setFullName('');
    setDisplayName('');
    setEmail('');
    setDescription('');
    setBiography('');
    setYearClassId([]);
    setFunctionMemberId([]);
    setLinkPortifolio('');
    setLinkLinkedin('');
    setTccName('');
    setTccUrl('');
    setTccDate('');
    setSkillsId([]);
    setArticlesId([]);
    setProjectsId([]);
    setPhoto(null);
    setIncludeTCC(false);
  };

  const loadOptions = async (service, inputValue, loadedOptions, { page }) => {
    try {
      const response = await service.list(page, 5, undefined, inputValue);
      console.log(response);
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
          <div className="form-group mb-3">
            <label htmlFor="yearClassId" className="fw-bold mb-1">Classe Anual</label>
            <AsyncSelect
              loadOptions={(inputValue, loadedOptions, additional) => 
                loadOptions(classService, inputValue, loadedOptions, additional)}
              placeholder="Selecione uma classe"
              isMulti
              value={yearClassId}
              onChange={setYearClassId}
              additional={{ page: 0 }}
              id="yearClassId"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="functionMemberId" className="fw-bold mb-1">Função do Membro</label>
            <AsyncSelect
              loadOptions={(inputValue, loadedOptions, additional) => 
                loadOptions(functionService, inputValue, loadedOptions, additional)}
              placeholder="Selecione uma função"
              isMulti
              value={functionMemberId}
              onChange={setFunctionMemberId}
              additional={{ page: 0 }}
              id="functionMemberId"
              required
            />
          </div>
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
          <div className="form-check mb-3">
            <input
              type="checkbox"
              id="includeTCC"
              className="form-check-input"
              checked={includeTCC}
              onChange={(e) => setIncludeTCC(e.target.checked)}
            />
            <label htmlFor="includeTCC" className="form-check-label">
              Incluir TCC
            </label>
          </div>
          {includeTCC && (
            <>
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
            </>
          )}
          <div className="form-group mb-3">
            <label htmlFor="skillsId" className="fw-bold mb-1">Habilidades</label>
            <AsyncSelect
              loadOptions={(inputValue, loadedOptions, additional) => 
                loadOptions(skillService, inputValue, loadedOptions, additional)}
              placeholder="Selecione habilidades"
              isMulti
              value={skillsId}
              onChange={setSkillsId}
              additional={{ page: 0 }}
              id="skillsId"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="articlesId" className="fw-bold mb-1">Artigos</label>
            <AsyncSelect
              loadOptions={(inputValue, loadedOptions, additional) => 
                loadOptions(articleService, inputValue, loadedOptions, additional)}
              placeholder="Selecione artigos"
              isMulti
              value={articlesId}
              onChange={setArticlesId}
              additional={{ page: 0 }}
              id="articlesId"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="projectsId" className="fw-bold mb-1">Projetos</label>
            <AsyncSelect
              loadOptions={(inputValue, loadedOptions, additional) => 
                loadOptions(projectsService, inputValue, loadedOptions, additional)}
              placeholder="Selecione projetos"
              isMulti
              value={projectsId}
              onChange={setProjectsId}
              additional={{ page: 0 }}
              id="projectsId"
              required
            />
          </div>
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
