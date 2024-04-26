'use client';

import Authorization from '../authorization/authorization';

export default function LogoutButton () {

  return (
    <div>
      <button onClick={(() => Authorization.logout())}>
        Sair
      </button>
    </div>
  );
}
