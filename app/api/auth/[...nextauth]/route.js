/* eslint-disable no-undef */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthApiService } from '@/services/api/Auth/AuthService';
import { cookies } from 'next/headers';
import url from '@/routes/url';

const handler = NextAuth({
  pages: {
    signIn: url.auth.login,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const session = await AuthApiService.login(credentials.email, credentials.password);
        if (session?.status == 401) {
          return null;
        } else {
          cookies().set('next-auth.token', session.token, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: parseInt(process.env.NEXTAUTH_EXPIRES_TOKEN, 10),  // Parse as integer
          });

          return {
            id: session.user_id,
            name: session.full_name,
            email: session.user_email,
            image: session.photo
          };
        }
      }
    })
  ],
  session: {
    maxAge: parseInt(process.env.NEXTAUTH_EXPIRES_TOKEN, 10),  // Parse as integer
    strategy: 'jwt',  // Ensure to use JWT strategy if not already configured
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: parseInt(process.env.NEXTAUTH_EXPIRES_TOKEN, 10),  // Parse as integer
  },
});

export { handler as GET, handler as POST };
