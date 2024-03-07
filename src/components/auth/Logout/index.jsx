import { useEffect } from 'react';
import { tokenService } from '../../../services/auth/tokenService';
import { useRouter } from 'next/router';

export function Logout () {

  const router = useRouter();

  useEffect( () => {
    tokenService.delete();
    fetch('/api/refresh', {
      method: 'DELETE'
    })
      .then(() => {
        router.push('/login');
      });
  }, []);

  return (
    <div>
      Você será redirecionado em instantes
    </div>
  );
}
