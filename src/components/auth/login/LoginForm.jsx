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
import url from '@/routes/url';
import LoadingPage from '@/components/loading/LoadingPage';
import { loginAction } from '@/components/action/loginAction';

export default function Login() {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [renderRestorePassword, setRenderRestorePassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingFinished, setLoadingFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setLoadingFinished(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let errorTimeout;
    if (toggle) {
      errorTimeout = setTimeout(() => {
        setToggle(false);
      }, 2000);
    }
    return () => clearTimeout(errorTimeout);
  }, [toggle]);

  async function login(e) {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await loginAction(email, password);
      if (res) {
        router.push(url.admin.usuario.home);
      } else {
        setLoading(false);
        setToggle(true);
      }
    } catch (error) {
      setToggle(true);
    } 
  }

  async function resetPassword(e) {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;

    try {
      await Authorization.resetPassword(email);
      setToggle(true);
    } catch (error) {
      setToggle(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <LoadingPage />}
      {!loading && loadingFinished && (
        <div className={styles.pageLogin}>
          <BackgroundVideo />
          <div className={styles.logoContainer}>
            <Image src={logoLaFocA} alt="LogoLAFocA" priority />
          </div>

          {!renderRestorePassword && (
            <div className={styles.containerLoginForm}>
              <div className={styles.welcomeLogin}>
                <div className={styles.logoContainerMobile}>
                  <Image src={logoLaFocA} alt="Logo LAFocA" priority />
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
                  <span className={`${styles.error} ${toggle ? '' : styles.hidden}`}>Credenciais inválidas</span>
                  <Button loading={loading}>Faça o Login no sistema</Button>
                </form> 
              </div>
              <div className={styles.restorePassword}>
                <p>Esqueceu a senha?</p>
                <a style={{ cursor: 'pointer' }} onClick={() => setRenderRestorePassword(!renderRestorePassword)}>Redefinir Senha</a>
              </div>
            </div>
          )}

          {renderRestorePassword && (
            <div className={styles.containerLoginForm}>
              <div className={styles.welcomeLogin}>
                <h2>REDEFINIR SENHA</h2>
                <div>
                  <p>Por favor, digite seu endereço de e-mail para redefinir sua senha.</p>
                </div>
              </div>
              <div className={styles.formLogin}>
                <form onSubmit={resetPassword}>
                  <InputField label="E-mail" type="email" name="email" />
                  <span className={`${styles.error} ${toggle ? '' : styles.hidden}`}>Verifique sua caixa de mensagem</span>
                  <Button loading={loading}>Enviar e-mail</Button>
                </form> 
              </div>
              <div className={styles.restorePassword}>
                <p>Já tem uma conta?</p>
                <a style={{ cursor: 'pointer' }} onClick={() => setRenderRestorePassword(!renderRestorePassword)}>Fazer Login</a>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
