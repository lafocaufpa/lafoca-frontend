'use client';

import { useState, useEffect, useRef } from 'react';
import { userService } from '@/services/api/Users/UserService';
import { groupService } from '@/services/api/groups/GroupService';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddUser() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const photoInputRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

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
      setSuccess(true);
      setEmail('');
      setName('');
      setPassword('');
      setSelectedGroups([]);
      setPhoto(null);
      
      if (photoInputRef.current) {
        photoInputRef.current.value = '';
        photoInputRef.current.type = 'text';
        photoInputRef.current.type = 'file';
      }

    } catch (error) {
      setError(error.userMessage || 'Erro ao adicionar usuário.');
    }
  };

  const handleGroupChange = (selectedOptions) => {
    setSelectedGroups(selectedOptions);
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  return (
    <div className="container mt-5">
      <h2>Adicionar Usuário</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Usuário adicionado com sucesso!</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control w-50"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            onBlur={(e) => handlePasswordIsValid(e.target.value)}
            required
          />
        </div>
        <div className="form-group form-check">
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
        {isClient && (
          <div className="form-group">
            <label htmlFor="groups">Grupos</label>
            <Select
              isMulti
              name="groups"
              options={groups.map(group => ({ value: group.id, label: group.name }))}
              className="basic-multi-select w-50"
              classNamePrefix="select"
              onChange={handleGroupChange}
              value={selectedGroups}
              id="groups"
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="photo">Foto</label>
          <input
            type="file"
            className="form-control"
            id="photo"
            onChange={handlePhotoChange}
            ref={photoInputRef}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Adicionar Usuário</button>
      </form>
    </div>
  );
}
