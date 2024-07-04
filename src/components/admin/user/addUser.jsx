'use client';

import React, { useState, useRef } from 'react';
import { userService } from '@/services/api/Users/UserService';
import { groupService } from '@/services/api/groups/GroupService';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import AsyncSelect from '@/components/asyncSelectV2/AsyncSelect';
import InputField from '@/components/inputField/InputField';
import PhotoSelector from '@/components/photoSelector/photoSelector';

export default function AddUser() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);
  const imageCropRef = useRef(null);

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
        return;
      }
    }
    hideError();
  };

  const handleConfirmPasswordBlur = () => {
    if (password !== confirmPassword) {
      showError('As senhas não coincidem.');
    } else {
      hideError();
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    hideError();

    if (password !== confirmPassword) {
      showError('As senhas não coincidem.');
      return;
    }

    const userData = {
      email,
      name,
      password,
      groups: selectedGroups.map(group => group.value),
    };

    try {
      const newUser = await userService.add(userData);
      if (photo) {
        await userService.addPhoto(newUser.id, photo);
      }
      setEmail('');
      setName('');
      setPassword('');
      setConfirmPassword('');
      setSelectedGroups([]);
      setPhoto(null);

      if (imageCropRef.current) {
        imageCropRef.current.resetImageCrop();
      }

      showSuccessMessage('Usuário adicionado com sucesso!');

    } catch (error) {
      showError(error?.userMessage || 'Erro ao adicionar usuário.');
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
        <h2 className="text-center mb-4">Adicionar Usuário</h2>
        {successMessage && (
          <AlertMessage type="success" message={successMessage} onClose={hideSuccessMessage} />
        )}
        {error && (
          <AlertMessage type="error" message={error} onClose={hideError} />
        )}
        <form onSubmit={handleSubmit}>
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
          <InputField
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => handlePasswordIsValid(e.target.value)}
            required
          />
          <InputField
            label="Confirme a Senha"
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={handleConfirmPasswordBlur}
            required
          />
          <div className="form-group form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="form-check-label" htmlFor="showPassword">
              Mostrar Senha
            </label>
          </div>
          <AsyncSelect
            loadOptions={(inputValue, loadedOptions, additional) => 
              loadOptions(groupService, inputValue, loadedOptions, additional)
            }
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
          <button type="submit" className="btn btn-primary w-100">Adicionar Usuário</button>
        </form>
      </div>
    </div>
  );
}
