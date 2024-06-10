'use client';

import { useRouter } from 'next/navigation';
import Authorization from '@/components/auth/authorization/authorization';
import { useEffect, useState } from 'react';
import styles from './LoginForm.module.css';
import InputField from './inputField/InputField';
import Button from './submitButton/Button';
import BackgroundVideo from '@/components/backgroundVideo/BackgroundVideo';
import Image from 'next/image';
import logoLaFocA from '@images/icons/LogoLAFocA.png';
import routes from '@/routes';

export default function Login() {
 
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [renderRestorePassword, setRenderRestorePassword] = useState(false);

  useEffect(() => {
    const removeCookie = async () => {
      await Authorization.removeCookie();
    };

    removeCookie();
  }, []);

  useEffect(() => {
    let errorTimeout;
    if (toggle) {
      errorTimeout = setTimeout(() => {
        setToggle(!toggle);
      }, 2000);
    }
    return () => clearTimeout(errorTimeout);
  }, [toggle]);

  async function login(e){
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    const res = await Authorization.login(email, password);

    if(res) {
      router.push(routes.admin.ADMIN);
    } else {
      setToggle(!toggle);
    }
  }


  async function resetPassword(e) {
    e.preventDefault();

    const email = e.target.email.value;

    await Authorization.resetPassword(email);

    setToggle(!toggle);
    
  }
  
  return (
    <div className={styles.pageLogin}>
      <BackgroundVideo/>
      <div className={styles.logoContainer}>
        <Image src={logoLaFocA} alt="Logo LA FocA" priority/>
      </div>

      {!renderRestorePassword && (<div className={styles.containerLoginForm}>
        <div className={styles.welcomeLogin}>

          <div className={styles.logoContainerMobile}>
            <Image src={logoLaFocA} alt="Logo LA FocA" priority/>
          </div>
          
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
            {(
              <span className={`${styles.error} ${toggle ? '' : styles.hidden}`}>Credenciais inválidas</span>
            )}
            <Button>Faça o Login no sistema</Button>
          </form> 
        </div>
        <div className={styles.restorePassword}>
          <p>Esqueceu a senha?</p>
          <a style={{cursor: 'pointer'}} onClick={() => setRenderRestorePassword(!renderRestorePassword)}>Redefinir Senha</a>
        </div>
      </div> )}

      {renderRestorePassword && (<div className={styles.containerLoginForm}>
        <div className={styles.welcomeLogin}>
          <h2>REDEFINIR SENHA</h2>
          <div>
            <p>Por favor, digite seu endereço de e-mail para redefinir sua senha.</p>
          </div>
        </div>
        <div className={styles.formLogin}>
          <form onSubmit={resetPassword}>
            <InputField label="E-mail" type="email" name="email" />
            {(
              <span className={`${styles.error} ${toggle ? '' : styles.hidden}`}>Verifique sua caixa de mensagem</span>
            )}
            <Button>Enviar email</Button>
          </form> 
        </div>
        <div className={styles.restorePassword}>
          <p>Já tem uma conta?</p>
          <a style={{cursor: 'pointer'}} onClick={() => setRenderRestorePassword(!renderRestorePassword)}>Fazer Login</a>
        </div>
      </div> )}
          
    </div>
  );
}