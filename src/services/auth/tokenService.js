import nookies from 'nookies';

const ACCESS_TOKEN_KEY = 'token';

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_YEAR = ONE_DAY * 365;

export const tokenService = {
  save(accessToken, contexto = null){
  
    nookies.set(contexto, ACCESS_TOKEN_KEY, accessToken, {
      maxAge: ONE_YEAR,
      path: '/'
    });
  },
  
  get(contexto = null) {
    const cookies = nookies.get(contexto);
    return cookies[ACCESS_TOKEN_KEY] || '';
  },

  delete(contexto = null) {
    // localStorage.removeItem(ACCESS_TOKEN_KEY);
    // sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    nookies.destroy(contexto, ACCESS_TOKEN_KEY);
  }
};