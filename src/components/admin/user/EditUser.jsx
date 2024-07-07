'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { userService } from '@/services/api/Users/UserService';
import { groupService } from '@/services/api/groups/GroupService';
import 'bootstrap/dist/css/bootstrap.min.css';
import url from '@/routes/url';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import PhotoSelector from '@/components/photoSelector/photoSelector';
import AsyncSelect from '@/components/asyncSelectV2/AsyncSelect';
import InputField from '@/components/inputField/InputField';

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
        setEmail(user?.email);
        setName(user?.name);
        setSelectedGroups(user.groups.map(group => ({ value: group.id, label: group.name })));
        if (user.urlPhoto) {
          setPhoto(user?.urlPhoto);
        }
      } catch (error) {
        showError(error?.userMessage || 'Erro ao carregar usuário.');
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
      }, 1000);

    } catch (error) {
      showError(error?.userMessage || 'Erro ao editar usuário.');
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
      showError(error?.userMessage || 'Erro ao alterar a senha.');
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
      await userService.removePhoto(userId);
      setPhoto(null);
      if (imageCropRef.current) {
        imageCropRef.current.resetImageCrop();
      }
      showSuccessMessage('Foto removida com sucesso!');
    } catch (error) {
      showError(error?.userMessage || 'Erro ao remover a foto.');
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
          <InputField
            label="Email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            label="Nome"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <AsyncSelect
            loadOptions={loadOptions}
            service={groupService}
            placeholder="Selecione grupos de segurança para o usuário"
            label="Grupos de Segurança"
            isMulti
            value={selectedGroups}
            onChange={setSelectedGroups}
            additional={{ page: 0 }}
            id="selectedGroups"
            required
          />
          <PhotoSelector
            photo={photo}
            setPhoto={setPhoto}
            imageCropRef={imageCropRef}
            handleRemovePhoto={handleRemovePhoto}
          />
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
  