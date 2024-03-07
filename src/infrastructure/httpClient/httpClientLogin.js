import { tokenService } from '../../services/auth/tokenService';
import nookies from 'nookies';

const REFRESH_TOKEN_NAME = 'refresh_token';

export async function httpClient(fetchUrl, fetchOptions) {
  return fetch(fetchUrl, {
    ...fetchOptions,
    method: 'POST', 
    headers: {
      ...fetchOptions.headers,
      'Authorization': `Basic ${fetchOptions.headers.Authorization}`, 
      'Content-Type': 'application/x-www-form-urlencoded',
    }, 
    body: fetchOptions.body ? fetchOptions.body.toString() : null
  })
    .then(async (response) => {
      return {
        ok: response.ok,
        status: response.status, 
        body: {
          ... await response.json(),
          token: tokenService.get(fetchOptions.contexto),
        }
      };
    })
    .then( async (response) => {
     
      if(fetchOptions.refresh && 
        response.status === 400 && 
        (response.body.error_description === 'Token has expired' || 'Cannot convert access token to JSON')){

        const isServer = Boolean(fetchOptions?.contexto);

        const currentRefreshToken = fetchOptions?.contexto?.req?.cookies['refresh_token'];

        const refreshResponse = await fetch('http://localhost:3000/api/refresh', {
          headers: isServer ? {'Content-Type': 'application/json'} : {},
          method: isServer ? 'PUT': 'GET',
          body: isServer ? JSON.stringify({refresh_token: currentRefreshToken}) : undefined
        })
          .then( async (response)=> {
            return {
              body: await response.json()
            };
          }).catch((erro) => console.log(erro));

        const newAccessToken = refreshResponse.body.refreshResponse.body.access_token;
        const newRefreshToken = refreshResponse.body.refreshResponse.body.refresh_token;

        if(isServer) {
          nookies.set(fetchOptions.contexto, REFRESH_TOKEN_NAME, newRefreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/'
          });
        }

        tokenService.save(newAccessToken);

        const formData = new URLSearchParams();
        formData.append('token', newAccessToken);
    
        const retryResponse = await httpClient(fetchUrl, {
          ...fetchOptions,
          refresh: false,
          body: formData

        });
        return retryResponse;
      }
      
      return response;
    });
}