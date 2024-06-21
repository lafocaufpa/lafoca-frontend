'use client';

import React, { useState, useRef } from 'react';
import { userService } from '@/services/api/Users/UserService';
import { groupService } from '@/services/api/groups/GroupService';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageCropProvider from '@/providers/ImageCropProvider';
import ImageCrop from '@components/admin/ImageCrop/ImageCrop';
import { AsyncPaginate } from 'react-select-async-paginate';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';

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
      showError(error.userMessage || 'Erro ao adicionar usuário.');
    }
  };

  const handleGroupChange = (selectedOptions) => {
    setSelectedGroups(selectedOptions);
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
            <label htmlFor="password" className="fw-bold mb-1">Senha</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              onBlur={(e) => handlePasswordIsValid(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="confirmPassword" className="fw-bold mb-1">Confirme a Senha</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} 
              onBlur={handleConfirmPasswordBlur}
              required
            />
          </div>
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
                <button type="button" className="btn btn-danger mt-3" onClick={handleRemovePhoto}>
                  Remover Foto
                </button>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">Adicionar Usuário</button>
        </form>
      </div>
    </div>
  );
}
