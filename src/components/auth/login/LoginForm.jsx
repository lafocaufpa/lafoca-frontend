'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Authorization from '@/components/auth/authorization/authorization';
import { useEffect } from 'react';
import styles from './LoginForm.module.css';
import Link from 'next/link';
import InputField from './inputField/InputField';
import Button from './submitButton/Button';

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
      console.log(res);
      router.push('/admin');
    }
  }
  
  return (
    <div className={styles.pageLogin}>
      <div className={styles.containerLoginForm}>
        <div className={styles.welcomeLogin}>
          <h2>Login</h2>
          <div>
            <p>Bem vindo(a) ao LA FocA!</p>
            <p>Por favor, faça o login para começar a gerenciar o site.</p>
          </div>
        </div>
        <div className={styles.formLogin}>
          <form onSubmit={login}>
            <InputField label="E-mail" type="email" name="email" />
            <InputField label="Senha" type="password" name="password" />
            <Button>Faça o Login no sistema</Button>
            {error === 'CredentialsSignin' && <span>Credenciais inválidas</span> }
          </form> 
        </div>
        <div className={styles.restorePassword}>
          <p>Esqueceu a senha?</p>
          <Link href={'/restore'}>Redefinir Senha</Link>
        </div>
      </div>     
    </div>
  );
}