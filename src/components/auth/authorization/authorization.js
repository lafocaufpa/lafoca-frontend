'use client';
import { signIn, signOut } from 'next-auth/react';
import deleteCookie from '@/components/auth/authorization/deleteCookie';
import {userService} from '@services/api/Users/UserService';
import getCookie from '@components/auth/authorization/getCookie';


async function logout() {
  await deleteCookie();
  signOut(); 
}

async function getToken() {
  const token = await getCookie();
  return token;
}

async function login(email, password) {

  const data = {
    email,
    password
  };

  return await signIn('credentials', {
    ...data,
    redirect: false,
  }).then(res => {
    if (res?.ok) {
      return res.ok;
    }
  });

}

async function resetPassword(email){

  const data = {
    email
  };

  userService.resetPassword(data);

}

async function removeCookie(){
  await deleteCookie();
}

const Authorization = {
  logout,
  login,
  removeCookie,
  resetPassword,
  getToken
};

export default Authorization;