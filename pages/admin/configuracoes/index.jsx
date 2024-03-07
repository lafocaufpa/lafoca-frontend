import Link from 'next/link';
import { withSession } from '../../../src/services/auth/session';
import routes from '../../../src/routes';

export const getServerSideProps = withSession((contexto) => {
  return {
    props: {
      session: contexto.req.session,
    }
  };
});

function Configuracoes(props) {
  return (
    <div>
      configuracoes do usuario
    
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>
      <Link href={routes.admin.configuracoes.usuarios}>
        Listar usuários do sistema
      </Link>
    </div>
  );
}
export default Configuracoes;