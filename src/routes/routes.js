const MEMBERS = '/members';
const PROJECTS = '/projects';
const LAFOCA = '/info';
const USERS = '/users';
const GROUPS = '/groups';

const routes = {
  auth: {
    login: '/login',
    session: '/check-token',
  },
  members: {
    list: (page = 0, resultsPerPage = 10, sort = '') => `${MEMBERS}/resumed?page=${page}&size=${resultsPerPage}&sort=${sort}`,
    addPhoto: (memberId) => `${MEMBERS}/${encodeURIComponent(memberId)}/photo`,
    removePhoto: (memberId) => `${MEMBERS}/${encodeURIComponent(memberId)}/photo`,
    add: `${MEMBERS}`,
    update: (memerId) => `${MEMBERS}/${encodeURIComponent(memerId)}`,
    readById: (memberId) => `${MEMBERS}/${encodeURIComponent(memberId)}`,
    delete: (memberId) => `${MEMBERS}/${encodeURIComponent(memberId)}`,
    readBySlug: (slug) => `${MEMBERS}/read/${encodeURIComponent(slug)}`,
    listSummarized: `${MEMBERS}/summarized`,

  },
  projects: {
    listSummarized: `${PROJECTS}/summarized`
  },
  lafoca: {
    listInfo: `${LAFOCA}`
  },
  users: {
    add: `${USERS}`,
    list: (page = 0, resultsPerPage = 10, sort = '') => `${USERS}?page=${page}&size=${resultsPerPage}&sort=${sort}`,
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
  }
};

export default routes;
