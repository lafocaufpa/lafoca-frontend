'use server';
import { cookies } from 'next/headers';

async function deleteCookie() {
  const allCookies = cookies().getAll();

  for (const cookie of allCookies) {
    cookies().delete(cookie.name);
  }
}

export default deleteCookie;