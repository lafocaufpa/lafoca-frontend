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
    paginatedList: (page = 0, resultsPerPage = 10, sort = '') => `${USERS}?page=${page}&size=${resultsPerPage}&sort=${sort}`,
    addPhoto: (userId) => `${USERS}/${encodeURIComponent(userId)}/photo`,
    removePhoto: (userId) => `${USERS}/${encodeURIComponent(userId)}/photo`,
    resetPassword: `${USERS}/reset-password`,
    updatePassword: (userId) => `${USERS}/${encodeURIComponent(userId)}/password`,
    readByUserId: (userId) => `${USERS}/${encodeURIComponent(userId)}`,
    readByEmail: (userEmail) => `${USERS}/read-by-email/${encodeURIComponent(userEmail)}`,
    edit: (userId) => `${USERS}/${encodeURIComponent(userId)}`,
    delete: (userId) => `${USERS}/${encodeURIComponent(userId)}`,
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
