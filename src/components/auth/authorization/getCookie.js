'use server';
import { cookies } from 'next/headers';

async function getCookie() {
  const allCookies = cookies().getAll();

  for (const cookie of allCookies) {
    if (cookie.name === 'next-auth.token') {

      return cookie.value;
    }
  }

  return null;
}

export default getCookie;
