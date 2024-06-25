'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { userService } from '@/services/api/Users/UserService';
import { groupService } from '@/services/api/groups/GroupService';
import { AsyncPaginate } from 'react-select-async-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageCropProvider from '@/providers/ImageCropProvider';
import ImageCrop from '@components/admin/ImageCrop/ImageCrop';
import url from '@/routes/url';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';

export default function EditUser({ userId }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);

  const imageCropRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await userService.readByUserId(userId);
        setEmail(user.email);
        setName(user.name);
        setSelectedGroups(user.groups.map(group => ({ value: group.id, label: group.name })));
        if (user.urlPhoto) {
          setPhoto(user.urlPhoto);
        }
      } catch (error) {
        showError(error.userMessage || 'Erro ao carregar usuário.');
      }
    };

    fetchUser();
  }, [userId]);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasUpperCase = /[A-Z]/;
    const hasSpecialChar = /[@!#$%&*-]/;

    if (password.length < minLength) {
      return 'A senha deve ter no mínimo 8 caracteres.';
    }
    if (!hasNumber.test(password)) {
      return 'A senha deve conter pelo menos um número.';
    }
    if (!hasUpperCase.test(password)) {
      return 'A senha deve conter pelo menos uma letra maiúscula.';
    }
    if (!hasSpecialChar.test(password)) {
      return 'A senha deve conter pelo menos um caractere especial (@!#$%&*-).';
    }
    return null;
  };

  const handlePasswordIsValid = (password) => {
    if (password) {
      const passwordError = validatePassword(password);
      if (passwordError) {
        showError(passwordError);
        return false;
      }
    }
    return true;
  };

  const handleConfirmPasswordBlur = () => {
    if (password !== confirmPassword) {
      showError('As senhas não coincidem.');
    }
  };

  const handleUserSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      email,
      name,
      groups: selectedGroups.map(group => group.value),
    };

    try {
      await userService.edit(userId, userData);

      if (photo && typeof photo !== 'string') {
        await userService.addPhoto(userId, photo);
      }

      showSuccessMessage('Usuário editado com sucesso!');

      setTimeout(() => {
        router.push(url.admin.usuario.home);
      }, 3000);

    } catch (error) {
      showError(error.userMessage || 'Erro ao editar usuário.');
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    if (!currentPassword || !password || password !== confirmPassword) {
      showError('Preencha corretamente os campos de senha.');
      return;
    }

    const isPasswordValid = handlePasswordIsValid(password);
    if (!isPasswordValid) {
      return;
    }

    try {
      await userService.updatePassword(userId, {
        currentPassword,
        newPassword: password,
      });

      setCurrentPassword('');
      setPassword('');
      setConfirmPassword('');
      showSuccessMessage('Senha alterada com sucesso!');
    } catch (error) {
      showError(error.userMessage || 'Erro ao alterar a senha.');
    }
  };

  const loadGroupOptions = async (inputValue, loadedOptions, { page }) => {
    try {
      const response = await groupService.list(page, 5, 'name,asc', inputValue);
      return {
        options: response.content.map(group => ({
          value: group.id,
          label: group.name,
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

  const handleGroupChange = (selectedOptions) => {
    setSelectedGroups(selectedOptions);
  };

  const handleRemovePhoto = async () => {
    try {
      await userService.removePhoto(userId);
      setPhoto(null);
      if (imageCropRef.current) {
        imageCropRef.current.resetImageCrop();
      }
      showSuccessMessage('Foto removida com sucesso!');
    } catch (error) {
      showError(error.userMessage || 'Erro ao remover a foto.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto p-4" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Editar Usuário</h2>
        {successMessage && (
          <AlertMessage type="success" message={successMessage} onClose={hideSuccessMessage} />
        )}
        {error && (
          <AlertMessage type="error" message={error} onClose={hideError} />
        )}
        <form onSubmit={handleUserSubmit}>
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
            <label htmlFor="name" className="fw-bold mb-1">Nome</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="groups" className="fw-bold mb-1">Grupos</label>
            <AsyncPaginate
              isMulti
              name="groups"
              loadOptions={loadGroupOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder='Selecione um grupo para o usuário'
              onChange={handleGroupChange}
              value={selectedGroups}
              additional={{
                page: 0,
              }}
              id="groups"
              required
              styles={{
                menu: base => ({
                  ...base,
                  zIndex: 9999, // Ajuste caso haja problemas de sobreposição
                  cursor: 'pointer'
                }),
                menuList: base => ({
                  ...base,
                  maxHeight: '200px', // A mesma altura máxima definida no CSS
                  overflowY: 'auto', // Permitir rolagem vertical
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
                  backgroundColor: isFocused ? '#d3d3d3' : 'transparent', // Exemplo de estilo quando focado
                  ':active': {
                    ...styles[':active'],
                    backgroundColor: isSelected ? '#d3d3d3' : 'transparent', // Exemplo de estilo quando selecionado
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
          <button type="submit" className="btn btn-primary w-100 mt-3">Salvar</button>
        </form>
        <h4 className="text-center mb-4 mt-4">Alterar Senha</h4>
        <form onSubmit={handlePasswordSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="currentPassword" className="fw-bold mb-1">Senha Atual</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Esconder' : 'Mostrar'}
              </button>
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="fw-bold mb-1">Nova Senha</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="confirmPassword" className="fw-bold mb-1">Confirmar Nova Senha</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={handleConfirmPasswordBlur}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">Alterar Senha</button>
        </form>
      </div>
    </div>
  );
}
  