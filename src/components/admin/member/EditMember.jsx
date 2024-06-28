'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MemberService } from '@/services/api/Members/MembersService';
import { classService } from '@/services/api/yearClass/YearClasses';
import { functionService } from '@/services/api/function/FunctionService';
import { skillService } from '@/services/api/skill/SkillService';
import { articleService } from '@/services/api/article/ArticleService';
import { projectsService } from '@/services/api/Projects/ProjectsService';
import { AsyncPaginate } from 'react-select-async-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageCropProvider from '@/providers/ImageCropProvider';
import ImageCrop from '@components/admin/ImageCrop/ImageCrop';
import url from '@/routes/url';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';

export default function EditMember({ memberId }) {
  const [fullName, setFullName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [biography, setBiography] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
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
        setSelectedClass({ value: member.yearClass.id, label: member.yearClass.year });
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
        showError(error.message || 'Erro ao carregar membro.');
      }
    };

    fetchMember();
  }, [memberId]);

  const handleMemberSubmit = async (event) => {
    event.preventDefault();

    const memberData = {
      fullName,
      displayName,
      email,
      description,
      biography,
      yearClassId: selectedClass.value,
      functionMemberId: functionMemberId ? functionMemberId.value : null,
      linkPortifolio:
      linkLinkedin,
      tcc: includeTCC ? {
        name: tccName,
        url: tccUrl,
        date: formatDate(tccDate),
      } : null,
      skillsId: skillsId.map(skill => skill.value),
      articlesId: articlesId.map(article => article.value),
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
      showError(error.message || 'Erro ao editar membro.');
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
      showError(error.message || 'Erro ao remover a foto.');
    }
  };

  const loadClassesOptions = async (inputValue, loadedOptions, { page }) => {
    try {
      const response = await classService.list(page, 5, 'year,asc', inputValue);
      return {
        options: response.content.map(classes => ({
          value: classes.id,
          label: classes.year,
        })),
        hasMore: !response.lastPage,
        additional: {
          page: page + 1,
        },
      };
    } catch (error) {
      console.error('Error fetching groups:', error);
      return {
        options: [],
        hasMore: false,
      };
    }
  };

  const handleClassesChange = (selectedOptions) => {
    setSelectedClass(selectedOptions);
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
          <div className="form-group mb-3">
            <label htmlFor="fullName" className="fw-bold mb-1">Nome Completo</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="displayName" className="fw-bold mb-1">Nome de Exibição</label>
            <input
              type="text"
              className="form-control"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email" className="fw-bold mb-1">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="description" className="fw-bold mb-1">Descrição</label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="biography" className="fw-bold mb-1">Biografia</label>
            <textarea
              className="form-control"
              id="biography"
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="yearClassId" className="fw-bold mb-1">Ano da Turma</label>
            <AsyncPaginate
              name="groups"
              loadOptions={loadClassesOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder='Selecione o ano da turma'
              onChange={handleClassesChange}
              value={selectedClass}
              additional={{
                page: 0,
              }}
              id="groups"
              required
              styles={{
                menu: base => ({
                  ...base,
                  zIndex: 9999,
                  cursor: 'pointer'
                }),
                menuList: base => ({
                  ...base,
                  maxHeight: '150px',
                  overflowY: 'auto',
                  cursor: 'pointer'
                }),
                control: (styles) => ({
                  ...styles,
                  cursor: 'pointer',
                }),
                dropdownIndicator: (styles) => ({
                  ...styles,
                  cursor: 'pointer'
                }),
                option: (styles, { isFocused, isSelected }) => ({
                  ...styles,
                  cursor: 'pointer',
                  backgroundColor: isFocused ? '#d3d3d3' : 'transparent',
                  ':active': {
                    ...styles[':active'],
                    backgroundColor: isSelected ? '#d3d3d3' : 'transparent',
                  }
                }),
              }}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="functionMemberId" className="fw-bold mb-1">Função</label>
            <AsyncPaginate
              loadOptions={(inputValue, loadedOptions, additional) =>
                loadOptions(functionService, inputValue, loadedOptions, additional)}
              placeholder="Selecione uma função"
              value={functionMemberId}
              onChange={setFunctionMemberId}
              additional={{ page: 0 }}
              id="functionMemberId"
              required
              styles={{
                menu: base => ({
                  ...base,
                  zIndex: 9999,
                  cursor: 'pointer'
                }),
                menuList: base => ({
                  ...base,
                  maxHeight: '150px',
                  overflowY: 'auto',
                  cursor: 'pointer'
                }),
                control: (styles) => ({
                  ...styles,
                  cursor: 'pointer',
                }),
                dropdownIndicator: (styles) => ({
                  ...styles,
                  cursor: 'pointer'
                }),
                option: (styles, { isFocused, isSelected }) => ({
                  ...styles,
                  cursor: 'pointer',
                  backgroundColor: isFocused ? '#d3d3d3' : 'transparent',
                  ':active': {
                    ...styles[':active'],
                    backgroundColor: isSelected ? '#d3d3d3' : 'transparent',
                  }
                }),
              }}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="linkPortifolio" className="fw-bold mb-1">Link do Portfólio</label>
            <input
              type="url"
              className="form-control"
              id="linkPortifolio"
              value={linkPortifolio}
              onChange={(e) => setLinkPortifolio(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="linkLinkedin" className="fw-bold mb-1">Link do LinkedIn</label>
            <input
              type="url"
              className="form-control"
              id="linkLinkedin"
              value={linkLinkedin}
              onChange={(e) => setLinkLinkedin(e.target.value)}
            />
          </div>
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
              <div className="form-group mb-3">
                <label htmlFor="tccName" className="fw-bold mb-1">Nome do TCC</label>
                <input
                  type="text"
                  className="form-control"
                  id="tccName"
                  value={tccName}
                  onChange={(e) => setTccName(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="tccUrl" className="fw-bold mb-1">URL do TCC</label>
                <input
                  type="url"
                  className="form-control"
                  id="tccUrl"
                  value={tccUrl}
                  onChange={(e) => setTccUrl(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="tccDate" className="fw-bold mb-1">Data do TCC</label>
                <input
                  type="date"
                  className="form-control"
                  id="tccDate"
                  value={tccDate}
                  onChange={(e) => setTccDate(e.target.value)}
                />
              </div>
            </>
          )}
          <div className="form-group mb-3">
            <label htmlFor="skillsId" className="fw-bold mb-1">Habilidades</label>
            <AsyncPaginate
              isMulti
              loadOptions={(inputValue, loadedOptions, additional) =>
                loadOptions(skillService, inputValue, loadedOptions, additional)}
              placeholder="Selecione habilidades"
              value={skillsId}
              onChange={setSkillsId}
              additional={{ page: 0 }}
              id="skillsId"
              styles={{
                menu: base => ({
                  ...base,
                  zIndex: 9999,
                  cursor: 'pointer'
                }),
                menuList: base => ({
                  ...base,
                  maxHeight: '150px',
                  overflowY: 'auto',
                  cursor: 'pointer'
                }),
                control: (styles) => ({
                  ...styles,
                  cursor: 'pointer',
                }),
                dropdownIndicator: (styles) => ({
                  ...styles,
                  cursor: 'pointer'
                }),
                option: (styles, { isFocused, isSelected }) => ({
                  ...styles,
                  cursor: 'pointer',
                  backgroundColor: isFocused ? '#d3d3d3' : 'transparent', // Example of style when focused
                  ':active': {
                    ...styles[':active'],
                    backgroundColor: isSelected ? '#d3d3d3' : 'transparent', // Example of style when selected
                  }
                }),
              }}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="articlesId" className="fw-bold mb-1">Artigos</label>
            <AsyncPaginate
              isMulti
              loadOptions={(inputValue, loadedOptions, additional) =>
                loadOptions(articleService, inputValue, loadedOptions, additional)}
              placeholder="Selecione artigos"
              value={articlesId}
              onChange={setArticlesId}
              additional={{ page: 0 }}
              id="articlesId"
              styles={{
                menu: base => ({
                  ...base,
                  zIndex: 9999,
                  cursor: 'pointer'
                }),
                menuList: base => ({
                  ...base,
                  maxHeight: '150px',
                  overflowY: 'auto',
                  cursor: 'pointer'
                }),
                control: (styles) => ({
                  ...styles,
                  cursor: 'pointer',
                }),
                dropdownIndicator: (styles) => ({
                  ...styles,
                  cursor: 'pointer'
                }),
                option: (styles, { isFocused, isSelected }) => ({
                  ...styles,
                  cursor: 'pointer',
                  backgroundColor: isFocused ? '#d3d3d3' : 'transparent', // Example of style when focused
                  ':active': {
                    ...styles[':active'],
                    backgroundColor: isSelected ? '#d3d3d3' : 'transparent', // Example of style when selected
                  }
                }),
              }}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="projectsId" className="fw-bold mb-1">Projetos</label>
            <AsyncPaginate
              isMulti
              loadOptions={(inputValue, loadedOptions, additional) =>
                loadOptions(projectsService, inputValue, loadedOptions, additional)}
              placeholder="Selecione projetos"
              value={projectsId}
              onChange={setProjectsId}
              additional={{ page: 0 }}
              id="projectsId"
              styles={{
                menu: base => ({
                  ...base,
                  zIndex: 9999,
                  cursor: 'pointer'
                }),
                menuList: base => ({
                  ...base,
                  maxHeight: '150px',
                  overflowY: 'auto',
                  cursor: 'pointer'
                }),
                control: (styles) => ({
                  ...styles,
                  cursor: 'pointer',
                }),
                dropdownIndicator: (styles) => ({
                  ...styles,
                  cursor: 'pointer'
                }),
                option: (styles, { isFocused, isSelected }) => ({
                  ...styles,
                  cursor: 'pointer',
                  backgroundColor: isFocused ? '#d3d3d3' : 'transparent', // Example of style when focused
                  ':active': {
                    ...styles[':active'],
                    backgroundColor: isSelected ? '#d3d3d3' : 'transparent', // Example of style when selected
                  }
                }),
              }}
            />
          </div>
          <div className="form-group mb-3">
            <div className='d-flex justify-content-center align-items-center flex-column'>
              <label htmlFor="photo" className="fw-bold mb-1">Selecione uma foto</label>
              <ImageCropProvider>
                <ImageCrop photo={photo} setPhoto={setPhoto} ref={imageCropRef} />
              </ImageCropProvider>
              {photo && (
                <div className='d-flex justify-content-center align-items-center mt-3'>
                  <button type="button" className="btn btn-danger" onClick={handleRemovePhoto}>Remover Foto</button>
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">Atualizar Membro</button>
        </form>
      </div>
    </div>
  );
}