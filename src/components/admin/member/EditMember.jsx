'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MemberService } from '@/services/api/Members/MembersService';
import { classService } from '@/services/api/yearClass/YearClasses';
import { functionService } from '@/services/api/function/FunctionService';
import { skillService } from '@/services/api/skill/SkillService';
import { articleService } from '@/services/api/article/ArticleService';
import { projectsService } from '@/services/api/Projects/ProjectsService';
import 'bootstrap/dist/css/bootstrap.min.css';
import url from '@/routes/url';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import InputField from '@/components/inputField/InputField';
import AsyncSelect from '@/components/asyncSelectV2/AsyncSelect';
import PhotoSelector from '@/components/photoSelector/photoSelector';

export default function EditMember({ memberId }) {
  const [fullName, setFullName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [biography, setBiography] = useState('');
  const [yearClass, setYearClass] = useState(null);
  const [functionMemberId, setFunctionMemberId] = useState(null);
  const [linkPortifolio, setLinkPortifolio] = useState('');
  const [linkLinkedin, setLinkLinkedin] = useState('');
  const [tccName, setTccName] = useState('');
  const [tccUrl, setTccUrl] = useState('');
  const [tccDate, setTccDate] = useState('');
  const [includeTCC, setIncludeTCC] = useState(false);
  const [skillsId, setSkillsId] = useState([]);
  const [articlesId, setArticlesId] = useState([]);
  const [projectsId, setProjectsId] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);
  const imageCropRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const member = await MemberService.readById(memberId);
        
        setFullName(member.fullName);
        setDisplayName(member.displayName);
        setEmail(member.email);
        setDescription(member.description);
        setBiography(member.biography);
        setYearClass({ value: member.yearClass.id, label: member.yearClass.year });
        setFunctionMemberId({ value: member.functionMember.id, label: member.functionMember.name });
        setLinkPortifolio(member.linkPortifolio);
        setLinkLinkedin(member.linkLinkedin);
        if (member.tcc) {
          setIncludeTCC(true);
          setTccName(member.tcc.name);
          setTccUrl(member.tcc.url);
          setTccDate(convertDateToInputFormat(member.tcc.date));
        }
        setSkillsId(member.skills.map(skill => ({ value: skill.id, label: skill.name })));
        setArticlesId(member.articles.map(article => ({ value: article.id, label: article.title })));
        setProjectsId(member.projects.map(project => ({ value: project.id, label: project.title })));
        if (member.urlPhoto) {
          setPhoto(member.urlPhoto);
        }
      } catch (error) {
        showError(error?.userMessage || 'Erro ao carregar membro.');
      }
    };

    fetchMember();
  }, [memberId]);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return url.length > 10;
    } catch (e) {
      return false;
    }
  };

  const handleMemberSubmit = async (event) => {
    event.preventDefault();
    hideError();


    if (linkPortifolio && !isValidUrl(linkPortifolio)) {
      showError('O link do portifólio é inválido.');
      return;
    }

    if (linkLinkedin && !isValidUrl(linkLinkedin)) {
      showError('O link do LinkedIn é inválido.');
      return;
    }

    const memberData = {
      fullName,
      displayName,
      email,
      description,
      biography,
      yearClassId: parseInt(yearClass.value),
      functionMemberId: functionMemberId ? parseInt(functionMemberId?.value) : null,
      linkPortifolio: linkPortifolio.trim() === '' ? null : linkPortifolio,
      linkLinkedin: linkLinkedin.trim() === '' ? null : linkLinkedin,
      tcc: includeTCC ? {
        name: tccName,
        url: tccUrl,
        date: formatDate(tccDate),
      } : null,
      skillsId: skillsId.map(skill =>  parseInt(skill.value)),
      articlesId: articlesId.map(article =>  parseInt(article.value)),
      projectsId: projectsId.map(project => project.value),
    };


    try {
      await MemberService.update(memberId, memberData);

      if (photo && typeof photo !== 'string') {
        await MemberService.addPhoto(memberId, photo);
      }

      showSuccessMessage('Membro editado com sucesso!');

      setTimeout(() => {
        router.push(url.admin.membro.home);
      }, 3000);

    } catch (error) {
      showError(error?.userMessage || 'Erro ao editar membro.');
    }
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

  const handleRemovePhoto = async () => {
    try {
      await MemberService.removePhoto(memberId);
      setPhoto(null);
      if (imageCropRef.current) {
        imageCropRef.current.resetImageCrop();
      }
      showSuccessMessage('Foto removida com sucesso!');
    } catch (error) {
      showError(error?.userMessage || 'Erro ao remover a foto.');
    }
  };
  
  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const convertDateToInputFormat = (date) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto p-4" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Editar Membro</h2>
        {successMessage && (
          <AlertMessage type="success" message={successMessage} onClose={hideSuccessMessage} />
        )}
        {error && (
          <AlertMessage type="error" message={error} onClose={hideError} />
        )}
        <form onSubmit={handleMemberSubmit}>
          <InputField
            label="Nome Completo"
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            maxLength={500}
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
            required
          />
          <AsyncSelect
            id="yearClass"
            label="Ano da Turma"
            placeholder="Selecione a turma"
            value={yearClass}
            onChange={setYearClass}
            service={classService}
            loadOptions={loadOptions}
            additionalProps={{ page: 0 }}
            required
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
            required
          />
          <InputField
            label="Link do Portfólio"
            type="text"
            id="linkPortifolio"
            value={linkPortifolio}
            onChange={(e) => setLinkPortifolio(e.target.value)}
          />
          <InputField
            label="Link do Linkedin"
            type="text"
            id="linkLinkedin"
            value={linkLinkedin}
            onChange={(e) => setLinkLinkedin(e.target.value)}
          />
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="includeTCC"
              checked={includeTCC}
              onChange={() => setIncludeTCC(!includeTCC)}
            />
            <label className="form-check-label" htmlFor="includeTCC">Incluir TCC</label>
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
                type="text"
                id="tccUrl"
                value={tccUrl}
                onChange={(e) => setTccUrl(e.target.value)}
                required
              />
              <InputField
                label="Data de Defesa do TCC"
                type="date"
                id="tccDate"
                value={tccDate}
                onChange={(e) => setTccDate(e.target.value)}
                required
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
          <button type="submit" className="btn btn-primary w-100">Atualizar Membro</button>
        </form>
      </div>
    </div>
  );
}