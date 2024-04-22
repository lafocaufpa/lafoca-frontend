import AuthService from '@/modules/auth/services/auth-service';
// import { redirect } from 'next/navigation';

async function loginAccount(email, password) {
  'use client';


  const token = await AuthService.loginAccount(email, password);

  // if(token) {
  
  //   redirect('/admin');
  // }
  // else {
  //   redirect('/login?erro');
  // }
  
  // await AuthService.creationSessionToken();
  
  

  //usar opmistic update para atualizr a tela
  // redirect('/login');
}
  
const AuthActions = {
  loginAccount,
};

export default AuthActions;