import React, { useState } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import { authService } from '../../src/services/auth/authService';


const Login = () => {
  
  const router = useRouter();
  const [values, setValues] = useState({
    username: 'teste@gmail.com',
    password: 'teste'
  });

  function handleSubmit(event) {
    event.preventDefault();

    authService.login({
      username: values.username,
      password: values.password,
    })
      .then(()=>{
        router.push('/posts/auth-page-ssr');
        // router.push('/posts/auth-page-static');
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
      <p>
        <Link href='/posts/auth-page-ssr'>
          Auth-Page-SSR
        </Link>
        <span></span>
        <Link href='/posts/auth-page-static'>
          Auth-Page-Static
        </Link>
      </p>
    </div>
  );
};

export default Login;

