'use client';

import { useState, useEffect } from 'react';
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
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
      await userService.add(userData);
      setSuccess(true);
      setEmail('');
      setName('');
      setPassword('');
      setSelectedGroups([]);
    } catch (error) {
      setError(error.userMessage || 'Erro ao adicionar usuário.');
    }
  };

  const handleGroupChange = (selectedOptions) => {
    setSelectedGroups(selectedOptions);
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
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="btn btn-primary mt-3">Adicionar Usuário</button>
      </form>
    </div>
  );
}
