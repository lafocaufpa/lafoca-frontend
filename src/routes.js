const HOME = '/';
const MEMBERS = '/members';
const PROJECTS = '/projects';
const LAFOCA = '/info';
const USERS = '/users';
const ADMIN = '/admin';
const GROUPS = '/groups';

const routes = {
  auth: {
    login: '/login',
    logout: '/logout',
    session: '/check-token',
  },
  home: {
    HOME
  },
  members: {
    MEMBERS,
    member: (name) => `${MEMBERS}/search/${encodeURIComponent(name)}`,
    listSummarized: `${MEMBERS}/summarized`
  },
  projects: {
    listSummarized: `${PROJECTS}/summarized`
  },
  lafoca: {
    listInfo: `${LAFOCA}`
  },
  users: {
    USERS,
    list: `${USERS}`,
    resetPassword: `${USERS}/reset-password`
  },
  groups: {
    list: GROUPS
  },
  admin: {
    ADMIN,
    home: `${ADMIN}`,
    user: `${ADMIN}/usuario`,
    member: `${ADMIN}/membro`
  }
};

export default routes;
