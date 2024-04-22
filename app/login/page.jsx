// 'use client';
import AuthService from '@/modules/auth/services/auth-service';
// import React, {useState } from 'react';

const Login = () => {

  // const [email, setEmail] = useState('lafoca@gmail.com');
  // const [password, setPassword] = useState('');

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   AuthService.loginAccount(email, password);
  // };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email" 
            name='email' 
     
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password" 
            name='password'
          />
        </div>
        <button type="submit">
          Entrar
        </button>
      </form>   
    </div>
  );
};

export default Login;

