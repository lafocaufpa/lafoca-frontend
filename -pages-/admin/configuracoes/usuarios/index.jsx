import { useEffect, useState } from 'react';
import { withSession } from '../../../../src/services/auth/session';
import { usersService } from '../../../../src/services/users/usersService';

export const getServerSideProps = withSession((contexto) => {

  return {
    props: {
      session: contexto.req.session
    }
  };
});

function Usuarios({session}){

  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await usersService.listar(session.body.token);
        setData(response);
      } catch (error) {
        console.error('Erro ao listar usuários:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      Listando usuarios
      {console.log(data)}
      {data.map((usuario) => {
        return <p key={usuario.id}>{usuario.name}</p>;
      })}
    
    </div>
  );
}

export default Usuarios;