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
  }
};

export default routes;
