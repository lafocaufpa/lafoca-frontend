'use client';

import { useSearchParams } from 'next/navigation';
import Authorization from '../authorization/authorization';

export default function Login() {

  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={(e) => Authorization.login(e)}>
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