import { useEffect, useState } from 'react';
import { authService } from './authService';
import { useRouter } from 'next/router';

export function withSession(funcao) {

  return async (contexto) => {
    
    try{
      const session = await authService.getSession(contexto);
  
      const contextoModificado = {
        ...contexto,
        req: {
          ...contexto.req,
          session
        }
      };
  
      return funcao(contextoModificado);
    } catch(erro) {
      return {
        redirect: {
          permanent: false,
          destination: '/login/?error=401Unauthorized'
        }
      };
    }
  };
}

export function useSession() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    authService.getSession()
      .then((session)=> {
        setSession(session);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(()=> {
        setLoading(false);
      });
  }, []);
  

  return {
    data: {
      session,
    },
    loading,
    error,
  };
}

export function withSessionHOC(Component) {
  return function Wrapper(props) {

    const router = useRouter();
    const session = useSession();

    if(!session.loading && session.error){
      router.push('/login/?error=401Unauthorized');
    }

    const modifiedProps = {
      ...props,
      session: session.data.session
    };

    return (
      <Component {...modifiedProps}/>
    );
  };
}
