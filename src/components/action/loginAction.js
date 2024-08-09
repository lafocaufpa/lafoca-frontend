'use server';

import { signIn } from '@app/auth';

export async function loginAction(username, password) {
  try {
    await signIn('credentials', {
      username,
      password,
      redirect: false,
    });
    return true;
  } catch (error) {
    return false;

  }
}