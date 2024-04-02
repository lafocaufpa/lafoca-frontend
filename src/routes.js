const STUDENTS = '/members';
const PROJECTS = '/projects';
const LAFOCA = '/info';

const routes = {
  admin: {
    configuracoes: {
      index: '/admin/configuracoes',
      usuarios: '/admin/configuracoes/usuarios'
    }
  },
  login: '/login',
  logout: '/logout',
  posts: {
    authPageSSR: '/posts/auth-page-ssr',
    authPageStatic: '/posts/auth-page-static'
  },
  students: {
    listSummarized: `${STUDENTS}/summarized`
  },
  projects:{
    listSummarized: `${PROJECTS}/summarized`
  },
  lafoca: {
    listInfo: `${LAFOCA}` 
  }
};

export default routes;
