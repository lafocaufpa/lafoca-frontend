'use client';
import { signIn, signOut } from 'next-auth/react';
import deleteCookie from '@/components/auth/authorization/deleteCookie';

async function logout() {
  await deleteCookie();
  signOut();
  
}

function login(email, password) {

  const data = {
    email,
    password
  };

  signIn('credentials', {
    ...data,
    callbackUrl: '/admin'
  });

}

async function removeCookie(){
  await deleteCookie();
}

const Authorization = {
  logout,
  login,
  removeCookie
};

export default Authorization;