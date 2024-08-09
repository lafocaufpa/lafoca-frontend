/* eslint-disable no-undef */
import { AuthApiService } from '@/services/api/Auth/AuthService';
import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';

export const {auth, signIn, handlers:{GET,POST}} = NextAuth({
  providers: [
    credentials({
      name:'credentials',
      async authorize(credential){
        const user = await AuthApiService.login(credential.username, credential.password);
        if (user?.status == 401 || !user?.user_id) {
          // throw new Error(JSON.stringify(user));
          //há um bug aqui. Nada pode ser feito até sair atualizações do NextAuth v5
          // https://github.com/nextauthjs/next-auth/issues/9900
          return null;
        }
        return user;
      },
    }),
  ],
  
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt: async ({token, user}) => {
      if(user) {
        token.role = user.authorities;
        token.jwt = user.token;
        token.sub = user.user_id;
        token.picture = user.photo;
        token.email = user.user_email;
        token.name = user.full_name;
      }
      return token;
    },
    session: async ({session, token}) => {
      if(session?.user) {
        session.user.role = token.role;
        session.userId = token.sub;
        session.sessionToken = token.jwt;
        session.user.image = token.picture;
        session.user.name = token.name;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: parseInt(parseInt(process.env.NEXTAUTH_EXPIRES_TOKEN))
  }
});