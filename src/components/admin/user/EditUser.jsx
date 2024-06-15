'use client';

import { useState, useEffect, useRef } from 'react';
import { userService } from '@/services/api/Users/UserService';
import { groupService } from '@/services/api/groups/GroupService';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageCropProvider from '@/providers/ImageCropProvider';
import ImageCrop from '@components/admin/ImageCrop/ImageCrop';

export default function EditUser({ user }) {
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState(user.groups.map(group => ({ value: group.id, label: group.name })));
  const [photo, setPhoto] = useState(user.photo || null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const imageCropRef = useRef(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await groupService.list();
        setGroups(data.content);
      } catch (error) {
        console.log(error);
        setError(error.userMessage);
      }
    };

    fetchGroups();
  }, []);

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
        setError(passwordError);
        return;
      }
    }
    setError(null);
  };

  const handleConfirmPasswordBlur = () => {
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    const userData = {
      email,
      name,
      password: password ? password : undefined, // Only update password if provided
      groups: selectedGroups.map(group => group.value),
    };

    try {
      const updatedUser = await userService.edit(user.id, userData);
      if (photo && photo !== user.photo) {
        await userService.addPhoto(updatedUser.id, photo);
      }
      setSuccess(true);
    } catch (error) {
      setError(error.userMessage || 'Erro ao atualizar usuário.');
    }
  };

  const handleGroupChange = (selectedOptions) => {
    setSelectedGroups(selectedOptions);
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto p-4" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Editar Usuário</h2>
        {error && <div className="alert alert-danger mb-3">{error}</div>}
        {success && <div className="alert alert-success mb-3">Usuário atualizado com sucesso!</div>}
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
                <ImageCrop setPhoto={setPhoto} ref={imageCropRef} />
              </ImageCropProvider>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">Atualizar Usuário</button>
        </form>
      </div>
    </div>
  );
}
