import { signIn, signOut } from 'next-auth/react';
import { destroyCookie } from 'nookies';

function logout() {
  signOut();
  destroyCookie(null, 'tokenServer', {
    path: '/',
  });
}

function login(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  const data = {
    email: formData.get('email'), 
    password: formData.get('password')
  };

  signIn('credentials', {
    ...data,
    callbackUrl: '/admin'
  });

}

const Authorization = {
  logout,
  login,
};

export default Authorization;