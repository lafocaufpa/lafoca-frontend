'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import { authService } from '@services/auth/authService';
import routes from '@/routes';

const Login = () => {
  
  const router = useRouter();
  const [values, setValues] = useState({
    username: 'lafoca@gmail.com',
    password: 'lafoca'
  });

  function handleSubmit(event) {
    event.preventDefault();

    authService.login({
      username: values.username,
      password: values.password,
    })
      .then(()=>{
        router.push(routes.admin.configuracoes.index);
      })
      .catch((error)=> {
        alert(error);
      });    
  }

  function handleChange(event) {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;

    setValues((currentValues) => {
      return {
        ...currentValues,
        [fieldName]: fieldValue
      };
    });
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email" 
            name='username'
            value={values.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password" 
            name='password'
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">
          Entrar
        </button>
      </form>
 
      <Link href={routes.posts.authPageSSR}>
          Auth-Page-SSR
      </Link>
      <span></span>
      <Link href={routes.posts.authPageStatic}>
          Auth-Page-Static
      </Link>
   
    </div>
  );
};

export default Login;

