'use client';
import { signIn, signOut } from 'next-auth/react';
import deleteCookie from '@/components/auth/authorization/deleteCookie';


async function logout() {
  await deleteCookie();
  signOut();
  
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

async function removeCookie(){
  await deleteCookie();
}

const Authorization = {
  logout,
  login,
  removeCookie
};

export default Authorization;