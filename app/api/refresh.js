import nookies from 'nookies';
import { authService } from '../../src/services/auth/authService';
import { tokenService } from '../../src/services/auth/tokenService';

const REFRESH_TOKEN_NAME = 'refresh_token';

const controllers = {
  async storeRefreshToken(req, res) {
    const contexto = ({req, res});
    nookies.set(contexto, REFRESH_TOKEN_NAME, req.body.refresh_token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/'
    });

    res.json({
      data: {
        message: 'Stored with success!'
      }
    });
  }, 

  async regenerateTokens(req, res) {
    const contexto = ({req, res});
    const cookies = nookies.get(contexto);
    const refreshToken = cookies[REFRESH_TOKEN_NAME] || req.body.refresh_token;
    const refreshResponse = await authService.getRegenerateToken(refreshToken);
    
    nookies.set(contexto, REFRESH_TOKEN_NAME, refreshResponse.body.refresh_token,  {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });

    tokenService.save(refreshResponse.body.access_token, contexto);

    res.json({
      refreshResponse
    });
  }
};

const controllerBy = {
  POST: controllers.storeRefreshToken,
  GET: controllers.regenerateTokens,
  PUT: controllers.regenerateTokens,
  // GET: controllers.displayCookies
  DELETE: (req, res) => {
    const contexto = ({req, res});    
    
    nookies.destroy(contexto, REFRESH_TOKEN_NAME, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });

    res.status(200).json();
  }
};

export default function handler(request, response) {
  if(controllerBy[request.method]) return controllerBy[request.method](request, response);
  
  response.status(404).json({
    status: 400,
    message: 'Not Found'
  });
}