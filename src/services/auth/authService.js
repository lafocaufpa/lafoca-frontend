import { httpClient } from '../../infrastructure/httpClient/httpClientLogin';
import { tokenService } from './tokenService';

/* eslint-disable no-undef */
export const authService = {
  async login({username, password}) {

    return httpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth/token`, {
      headers: {
        'Authorization': this.getbase64Credentials(),
      },
      body: this.getformData(username, password)
    })
      .then( async (response)=> {
        if(response.ok){
          tokenService.save(response.body.access_token);

          return response.body;
        } else {
          throw new Error(JSON.stringify(response.body));
        } 
      })
      .then(async (body) => {
        //guarda o refresh token do usuário
        const refresh_token = body.refresh_token;
        await fetch('/api/refresh', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refresh_token: refresh_token
          })
        });
      });
  },

  async getSession(contexto = null) {
    const chamada = await httpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth/check_token`, {
      headers: {
        'Authorization': this.getbase64Credentials(),
      },
      refresh: true, 
      body: this.getCheckToken(contexto),
      contexto,
    })
      .then((response) => {
        
        if(!response.ok){
          throw new Error('Não autorizado');
        }

        return response;
      });
    return chamada;
  },

  async getRegenerateToken(refreshToken) {
    return httpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth/token`, { 
      headers: {
        'Authorization': this.getbase64Credentials(),
      },
      body: this.getBodyRefreshToken(refreshToken)
    });
  },

  getbase64Credentials(){

    const clientId = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_AUTH_CLIENT_SECRET;

    return btoa(`${clientId}:${clientSecret}`);
  },

  getformData(username, password){

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('grant_type', 'password');

    return formData;
  },

  getCheckToken(contexto){

    const token = tokenService.get(contexto);
    const formData = new URLSearchParams();
    formData.append('token', token);
    return formData;
  },

  getBodyRefreshToken(refreshToken) {

    const formData = new URLSearchParams();
    formData.append('refresh_token', refreshToken);
    formData.append('grant_type', 'refresh_token');

    return formData;
  }

};