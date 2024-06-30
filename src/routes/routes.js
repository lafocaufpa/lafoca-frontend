const MEMBERS = '/members';
const PROJECTS = '/projects';
const LAFOCA = '/info';
const USERS = '/users';
const GROUPS = '/groups';
const ARTICLES = '/articles';
const FUNCTIONS = '/functions-member';
const YEARCLASSES = '/year-classes';
const SKILLS = '/skills';
const TCCS = '/tccs';

const routes = {
  auth: {
    login: '/login',
    session: '/check-token',
  },
  members: {
    list: (page = 0, resultsPerPage = 10, sort = '', fullName = '', yearClassId = '') => {
      let url = `${MEMBERS}/resumed?page=${page}&size=${resultsPerPage}&sort=${sort}`;
      if (fullName) {
        url += `&fullName=${fullName}`;
      }
      if(yearClassId){
        url += `&yearClassId=${yearClassId}`;
      }
      return url;
    },
    addPhoto: (memberId) => `${MEMBERS}/${encodeURIComponent(memberId)}/photo`,
    removePhoto: (memberId) => `${MEMBERS}/${encodeURIComponent(memberId)}/photo`,
    add: `${MEMBERS}`,
    update: (memerId) => `${MEMBERS}/${encodeURIComponent(memerId)}`,
    readById: (memberId) => `${MEMBERS}/${encodeURIComponent(memberId)}`,
    delete: (memberId) => `${MEMBERS}/${encodeURIComponent(memberId)}`,
    readBySlug: (slug) => `${MEMBERS}/read/${encodeURIComponent(slug)}`,
    listSummarized: `${MEMBERS}/summarized`,
    listFull:  (page = 0, resultsPerPage = 10, sort = '') => `${MEMBERS}?page=${page}&size=${resultsPerPage}&sort=${sort}`,
  },
  projects: {
    list: (page = 0, resultsPerPage = 10, sort = '', query = '') => {
      let url = `${PROJECTS}?page=${page}&size=${resultsPerPage}&sort=${sort}`;
      if (query) {
        url += `&title=${query}`;
      }
      return url;
    },
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
    list: (page = 0, resultsPerPage = 10, sort = '', query = '') => {
      let url = `${GROUPS}?page=${page}&size=${resultsPerPage}&sort=${sort}`;
      if (query) {
        url += `&name=${query}`;
      }
      return url;
    },
    listWithoutPag: `${GROUPS}/list`,

  },
  article: {
    list: (page = 0, resultsPerPage = 10, sort = '', query = '') => {
      let url = `${ARTICLES}?page=${page}&size=${resultsPerPage}&sort=${sort}`;
      if (query) {
        url += `&title=${query}`;
      }
      return url;
    },
  },
  function: {
    list: (page = 0, resultsPerPage = 10, sort = '', query = '') => {
      let url = `${FUNCTIONS}?page=${page}&size=${resultsPerPage}&sort=${sort}`;
      if (query) {
        url += `&name=${query}`;
      }
      return url;
    },
  },
  classes: {
    list: (page = 0, resultsPerPage = 10, sort = '') => {
      let url = `${YEARCLASSES}?page=${page}&size=${resultsPerPage}&sort=${sort}`;
      return url;
    },
    listMemberByYearClass: (yearClassId, page = 0, resultsPerPage = 10, sort = '') => {
      let url = `${YEARCLASSES}/${yearClassId}/members?page=${page}&size=${resultsPerPage}&sort=${sort}`;
      return url;
    }
  },
  skills: {
    list: (page = 0, resultsPerPage = 10, sort = '', query = '') => {
      let url = `${SKILLS}?page=${page}&size=${resultsPerPage}&sort=${sort}`;
      if (query) {
        url += `&name=${query}`;
      }
      return url;
    },
  },
  tccs: {
    add: `${TCCS}`,
    list: (page = 0, resultsPerPage = 10, sort = '', query = '') => {
      let url = `${TCCS}?page=${page}&size=${resultsPerPage}&sort=${sort}`;
      if (query) {
        url += `&name=${query}`;
      }
      return url;
    },
  }
};

export default routes;
