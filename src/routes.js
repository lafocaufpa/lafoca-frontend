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
    addPhoto: (userId) => `${USERS}/${encodeURIComponent(userId)}/photo`,
    removePhoto: (userId) => `${USERS}/${encodeURIComponent(userId)}/photo`,
    resetPassword: `${USERS}/reset-password`,
    updatePassword: (userId) => `${USERS}/${encodeURIComponent(userId)}/password`,
    readByEmail: (userEmail) => `${USERS}/read-by-email/${encodeURIComponent(userEmail)}`
  },
  groups: {
    list: GROUPS,
    listWithoutPag: `${GROUPS}/list`
  },
  admin: {
    ADMIN,
    home: `${ADMIN}`,
    user: `${ADMIN}/usuario`,
    member: `${ADMIN}/membro`
  }
};

export default routes;
