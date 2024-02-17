import { useEffect } from 'react';
import { tokenService } from '../../src/services/auth/tokenService';
import { useRouter } from 'next/router';

export default function LogoutPage () {

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
