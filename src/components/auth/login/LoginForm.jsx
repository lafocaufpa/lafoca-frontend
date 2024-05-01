'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Authorization from '../authorization/authorization';
import { useEffect } from 'react';

export default function Login() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get('error');

  useEffect(() => {
    const removeCookie = async () => {
      await Authorization.removeCookie();
    };

    removeCookie();
  }, []);

  async function login(e){
    e.preventDefault();
    
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    const res = await Authorization.login(email, password);

    if(res) {
      router.push('/admin');
    }
  }
  
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
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
        {error === 'CredentialsSignin' && <span>Credenciais inválidas</span> }
      </form>   
    </div>
  );
}