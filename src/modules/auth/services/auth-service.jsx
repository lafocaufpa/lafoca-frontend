// import { cookies } from 'next/headers';
import { setCookie } from 'nookies';
import { AuthApiService } from '@/services/api/Auth/AuthService';
import { cookies } from 'next/headers';


async function openSession(tokenJwt) {

  const session = await AuthApiService.session(tokenJwt);
  const { token, user_id, full_name, user_email, issuer, exp_at, authorities } = session;

  // cookies().set('token', token,  {
  //   maxAge: 15*24*60*60, // 15 dias de validade
  //   path: '/', // Cookie disponivel em todos os paths
  //   httpOnly: true, // O cookie só é acessível por HTTP, não por JavaScript no navegador
  //   sameSite: 'strict', // Restringe o envio do cookie apenas para requisições do mesmo site
  // });

  console.log(session);
  
}

async function loginAccount(email, password){
  'use client';
  const token = await AuthApiService.login(email, password);

  setCookie(null, 'token', token, {
    maxAge: 15 * 24 * 60 * 60, // Expira em `expirationDays` dias
    path: '/', // Disponível em todos os caminhos do site
    secure: true, // Enviado apenas em conexões seguras (HTTPS)
    sameSite: 'strict', // Restringe o envio do cookie apenas para requisições do mesmo site
  });
}

const AuthService = {
  openSession,
  loginAccount 
};

export default AuthService;
