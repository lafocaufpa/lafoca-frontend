'use server';
import { auth } from '@app/auth';

async function getCookie() {
  const session = await auth();
  return session?.sessionToken;
}

export default getCookie;
