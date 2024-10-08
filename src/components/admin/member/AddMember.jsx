'use client';

import React, { useState, useRef } from 'react';
import { MemberService } from '@/services/api/Members/MembersService';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import InputField from '@components/inputField/InputField';
import AsyncSelect from '@/components/asyncSelectV2/AsyncSelect';
import { articleService } from '@/services/api/article/ArticleService';
import { projectsService } from '@/services/api/Projects/ProjectsService';
import { functionService } from '@/services/api/function/FunctionService';
import { skillService } from '@/services/api/skill/SkillService';
import { tccService } from '@/services/api/tcc/TccService';

import PhotoSelector from '@/components/photoSelector/photoSelector';
import YearSelect from '@/components/admin/adminSelects/YearSelect';

export default function AddMember() {
  const [fullName, setFullName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [biography, setBiography] = useState('');
  const [yearClassId, setYearClassId] = useState(null);
  const [functionMemberId, setFunctionMemberId] = useState(null);
  const [tccId, setTccId] = useState(null);
  const [linkPortifolio, setLinkPortifolio] = useState('');
  const [linkLinkedin, setLinkLinkedin] = useState('');
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
      yearClassId: parseInt(yearClassId.value),
      functionMemberId: functionMemberId ? parseInt(functionMemberId?.value) : null,
      linkPortifolio: linkPortifolio?.trim() === '' ? null : linkPortifolio,
      linkLinkedin: linkLinkedin?.trim() === '' ? null : linkLinkedin,
      tccId: includeTCC ? parseInt(tccId?.value) : null,
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
      showError(error?.userMessage || 'Erro ao adicionar membro.');
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
    setYearClassId(null);
    setFunctionMemberId(null);
    setLinkPortifolio('');
    setLinkLinkedin('');
    setTccId(null);
    setSkillsId([]);
    setArticlesId([]);
    setProjectsId([]);
    setPhoto(null);
    setIncludeTCC(false);
  };

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
            maxLength={225}
            required
          />
          <InputField
            label="Nome de Exibição"
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            maxLength={225}
            required
          />
          <InputField
            label="E-mail"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={225}
            required
          />
          <InputField
            label="Descrição"
            type="text"
            id="description"
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={225}
            required
          />
          <InputField
            label="Biografia"
            type="text"
            id="biography"
            as="textarea"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            maxLength={950}
            required
          />
          <YearSelect
              id="yearPubli"
              label="Ano da turma"
              value={yearClassId}
              onChange={setYearClassId}
              placeholder="Selecione o ano"
            />
          <AsyncSelect
            id="functionMemberId"
            label="Função do Membro"
            placeholder="Selecione a função do membro"
            value={functionMemberId}
            onChange={setFunctionMemberId}
            service={functionService}
            loadOptions={loadOptions}
            additionalProps={{ page: 0 }}
          />
          <InputField
            label="Link do Portifólio"
            type="url"
            id="linkPortifolio"
            value={linkPortifolio}
            onChange={(e) => setLinkPortifolio(e.target.value)}
            maxLength={225}
          />
          <InputField
            label="Link do Linkedin"
            type="url"
            id="linkLinkedin"
            value={linkLinkedin}
            onChange={(e) => setLinkLinkedin(e.target.value)}
            maxLength={225}
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
              <AsyncSelect
                id="tccId"
                label="Vincule um TCC existente ao Membro"
                placeholder="Selecione o TCC"
                value={tccId}
                onChange={setTccId}
                service={tccService}
                loadOptions={loadOptions}
                additionalProps={{ page: 0 }}
              />
            </>
          )}
          
          <AsyncSelect
            id="skillsId"
            label="Habilidades"
            placeholder="Selecione habilidades"
            value={skillsId}
            onChange={setSkillsId}
            service={skillService}
            loadOptions={loadOptions}
            additionalProps={{ page: 0 }}
            isMulti
          />
          <AsyncSelect
            id="articlesId"
            label="Artigos"
            placeholder="Selecione artigos"
            value={articlesId}
            onChange={setArticlesId}
            service={articleService}
            loadOptions={loadOptions}
            additionalProps={{ page: 0 }}
            isMulti
          />
          <AsyncSelect
            id="projectsId"
            label="Projetos"
            placeholder="Selecione projetos"
            value={projectsId}
            onChange={setProjectsId}
            service={projectsService}
            loadOptions={loadOptions}
            additionalProps={{ page: 0 }}
            isMulti
          />
          <PhotoSelector
            photo={photo}
            setPhoto={setPhoto}
            imageCropRef={imageCropRef}
            handleRemovePhoto={handleRemovePhoto}
          />
          <button type="submit" className="btn btn-primary w-100">Adicionar Membro</button>
        </form>
      </div>
    </div>
  );
}
