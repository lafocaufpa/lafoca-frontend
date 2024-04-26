/* eslint-disable no-undef */
import { AuthApiService } from '@/services/api/Auth/AuthService';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';

const handler = NextAuth({  
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {

        if(!credentials){
          return null;
        }

        const session = await AuthApiService.login(credentials.email, credentials.password);
        
  
        if(session?.status == 401) {
          return null;
        } else {
         
          cookies().set('next-auth.token', session.token, {
            path: '/',
          
            secure: true,
            httpOnly: true,
            sameSite: 'strict',
            expiresIn: process.env.NEXTAUTH_EXPIRES_TOKEN
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

    maxAge: process.env.NEXTAUTH_EXPIRES_TOKEN
  },
  callbacks: {
    session: {

    }
  }

});

export { handler as GET, handler as POST };