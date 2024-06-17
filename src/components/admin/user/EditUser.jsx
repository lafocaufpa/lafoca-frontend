'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import user1 from '@images/default_user.png';
import { userService } from '@/services/api/Users/UserService';
import { groupService } from '@/services/api/groups/GroupService';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageCropProvider from '@/providers/ImageCropProvider';
import ImageCrop from '@components/admin/ImageCrop/ImageCrop';

export default function EditUser({ userId }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const imageCropRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await groupService.listWithoutPag();
        setGroups(data);
      } catch (error) {
        console.log(error);
        setError(error.userMessage);
      }
    };

    const fetchUser = async () => {
      try {
        const user = await userService.read(userId);
        setEmail(user.email);
        setName(user.name);
        setSelectedGroups(user.groups.map(group => ({ value: group.id, label: group.name })));
        if (user.urlPhoto) {
          setPhoto(user.urlPhoto);
        }
      } catch (error) {
        console.log(error);
        setError(error.userMessage);
      }
    };

    fetchGroups();
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
        setPasswordError(passwordError);
        return;
      }
    }
    setPasswordError(null);
  };

  const handleConfirmPasswordBlur = () => {
    if (password !== confirmPassword) {
      setPasswordError('As senhas não coincidem.');
    } else {
      setPasswordError(null);
    }
  };

  const handleUserSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

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

      setSuccess(true);
      router.push('/admin/usuario'); 
    } catch (error) {
      setError(error.userMessage || 'Erro ao editar usuário.');
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (!currentPassword || !password || password !== confirmPassword) {
      setPasswordError('Preencha corretamente os campos de senha.');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setPasswordError(passwordError);
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
      setPasswordSuccess(true);
    } catch (error) {
      setPasswordError(error.userMessage || 'Erro ao alterar a senha.');
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
    } catch (error) {
      setError(error.userMessage || 'Erro ao remover a foto.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto p-4" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Editar Usuário</h2>
        {error && <div className="alert alert-danger mb-3">{error}</div>}
        {success && <div className="alert alert-success mb-3">Usuário editado com sucesso!</div>}
        <form onSubmit={handleUserSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="fw-bold mb-1">
              Email</label>
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
            <Select
              isMulti
              name="groups"
              options={groups.map(group => ({ value: group.id, label: group.name }))}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleGroupChange}
              value={selectedGroups}
              id="groups"
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
          <button type="submit" className="btn btn-primary w-100">Editar Usuário</button>
        </form>
      </div>

      <div className="card mx-auto p-4 mt-5" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Alterar Senha</h2>
        {passwordError && <div className="alert alert-danger mb-3">{passwordError}</div>}
        {passwordSuccess && <div className="alert alert-success mb-3">Senha alterada com sucesso!</div>}
        <form onSubmit={handlePasswordSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="currentPassword" className="fw-bold mb-1">Senha Atual</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="fw-bold mb-1">Nova Senha</label>
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
            <label htmlFor="confirmPassword" className="fw-bold mb-1">Confirme a Nova Senha</label>
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
          <div className="form-group mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="form-check-label" htmlFor="showPassword">Mostrar Senha</label>
          </div>
          <button type="submit" className="btn btn-primary w-100">Alterar Senha</button>
        </form>
      </div>
    </div>
  );
}
