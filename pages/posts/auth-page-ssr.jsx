import Link from 'next/link';
import { withSession } from '../../src/services/auth/session';

// export async function getServerSideProps(contexto){

//   try{
//     const session = await authService.getSession(contexto);
//     return {
//       props: {
//         session
//       }
//     };
//   } catch(error){
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/login/?error=401Unauthorized'
//       }
//     };
//   }
// }

//Lafoca Decorator Pattern



export const getServerSideProps = withSession((contexto) => {
  return {
    props: {
      session: contexto.req.session,
    }
  };
});


function AuthPageSSR(props) {
  return (
    <div>
      <h1>
        Auth Page SSR
      </h1>
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>
      <Link href={'/logout'}>
        logout
      </Link>
    </div>
  );
}

export default AuthPageSSR;