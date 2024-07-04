const MEMBERS = '/members';
const PROJECTS = '/projects';
const LAFOCA = '/info';
const USERS = '/users';
const GROUPS = '/groups';
const PERMISSIONS = '/permissions';
const ARTICLES = '/articles';
const FUNCTIONS = '/functions-member';
const YEARCLASSES = '/year-classes';
const SKILLS = '/skills';
const TCCS = '/tccs';
const LINESOFRESEARCH = '/lines-of-research';

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
    add: `${PROJECTS}`,
    list: (page = 0, resultsPerPage = 10, sort = '', query = '', lineOfResearchId = '') => {
      let url = `${PROJECTS}?page=${page}&size=${resultsPerPage}&sort=${sort}`;
      if (query) {
        url += `&title=${query}`;
      }

      if(lineOfResearchId) {
        url += `&lineOfResearchId=${lineOfResearchId}`;
      }
      
      return url;
    },
    update: (projectId) => `${PROJECTS}/${encodeURIComponent(projectId)}`,
    readById: (projectId) => `${PROJECTS}/${encodeURIComponent(projectId)}`,
    readBySlug: (projectId) => `${PROJECTS}/read/${encodeURIComponent(projectId)}`,
    delete: (projectId) => `${PROJECTS}/${encodeURIComponent(projectId)}`,
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
    add: `${GROUPS}`,
    list: (page = 0, resultsPerPage = 10, sort = '', name = '') => {
      let url = `${GROUPS}?page=${page}&size=${resultsPerPage}&sort=${sort}`;
      if (name) {
        url += `&name=${name}`;
      }
      return url;
    },
    update: (groupId) => `${GROUPS}/${encodeURIComponent(groupId)}`,
    readById: (groupId) => `${GROUPS}/${encodeURIComponent(groupId)}`,
    delete: (groupId) => `${GROUPS}/${encodeURIComponent(groupId)}`,
    listPermissionsByGroup: (groupId) => `${GROUPS}/${encodeURIComponent(groupId)}/permissions`,
    associatePermissionGroup: (groupId, permissionId) => `${GROUPS}/${encodeURIComponent(groupId)}/permissions/${encodeURIComponent(permissionId)}`,
    disassociatePermissionGroup: (groupId, permissionId) => `${GROUPS}/${encodeURIComponent(groupId)}/permissions/${encodeURIComponent(permissionId)}`,
  },
  article: {
    add: `${ARTICLES}`,
    list: (page = 0, resultsPerPage = 10, sort = '', query = '', lineOfResearchId = '') => {
      let url = `${ARTICLES}?page=${page}&size=${resultsPerPage}&sort=${sort}`;
      if (query) {
        url += `&title=${query}`;
      }

      if (lineOfResearchId) {
        url += `&lineOfResearchId=${lineOfResearchId}`;
      }
      return url;
    },
    update: (articleId) => `${ARTICLES}/${encodeURIComponent(articleId)}`,
    readById: (articleId) => `${ARTICLES}/${encodeURIComponent(articleId)}`,
    readBySlug: (articleSlug) => `${ARTICLES}/read/${encodeURIComponent(articleSlug)}`,
    delete: (articleId) => `${ARTICLES}/${encodeURIComponent(articleId)}`,
  },
  function: {
    add: `${FUNCTIONS}`,
    list: (page = 0, resultsPerPage = 10, sort = '', query = '') => {
      let url = `${FUNCTIONS}?page=${page}&size=${resultsPerPage}&sort=${sort}`;
      if (query) {
        url += `&name=${query}`;
      }
      return url;
    },
    update: (functionId) => `${FUNCTIONS}/${encodeURIComponent(functionId)}`,
    readById: (functionId) => `${FUNCTIONS}/${encodeURIComponent(functionId)}`,
    delete: (functionId) => `${FUNCTIONS}/${encodeURIComponent(functionId)}`,
  },
  classes: {
    list: (page = 0, resultsPerPage = 10, sort = '') => {
      let url = `${YEARCLASSES}?page=${page}&size=${resultsPerPage}&sort=${sort}`;
      return url;
    },
    listMemberByYearClass: (yearClassId, page = 0, resultsPerPage = 10, sort = '') => {
      let url = `${YEARCLASSES}/${yearClassId}/members?page=${page}&size=${resultsPerPage}&sort=${sort}`;
      return url;
    },
    add: `${YEARCLASSES}`,
    update: (classId) => `${YEARCLASSES}/${encodeURIComponent(classId)}`,
    readById: (classId) => `${YEARCLASSES}/${encodeURIComponent(classId)}`,
    delete: (classId) => `${YEARCLASSES}/${encodeURIComponent(classId)}`,
  },
  skills: {
    add: `${SKILLS}`,
    list: (page = 0, resultsPerPage = 10, sort = '', query = '') => {
      let url = `${SKILLS}?page=${page}&size=${resultsPerPage}&sort=${sort}`;
      if (query) {
        url += `&name=${query}`;
      }
      return url;
    },
    update: (skillsId) => `${SKILLS}/${encodeURIComponent(skillsId)}`,
    readById: (skillsId) => `${SKILLS}/${encodeURIComponent(skillsId)}`,
    delete: (skillsId) => `${SKILLS}/${encodeURIComponent(skillsId)}`,
    addPhoto: (skillsId) => `${SKILLS}/${encodeURIComponent(skillsId)}/pic`,
    removePhoto: (skillsId) => `${SKILLS}/${encodeURIComponent(skillsId)}/pic`,
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
    update: (tccId) => `${TCCS}/${encodeURIComponent(tccId)}`,
    readById: (tccId) => `${TCCS}/${encodeURIComponent(tccId)}`,
    delete: (tccId) => `${TCCS}/${encodeURIComponent(tccId)}`,
  },
  linesOfResearch: {
    add: `${LINESOFRESEARCH}`,
    list: (page = 0, resultsPerPage = 10, sort = '', name = '') => {
      let url = `${LINESOFRESEARCH}?page=${page}&size=${resultsPerPage}&sort=${sort}`;
      if (name) {
        url += `&name=${name}`;
      }
      return url;
    },
    update: (lineId) => `${LINESOFRESEARCH}/${encodeURIComponent(lineId)}`,
    readById: (lineId) => `${LINESOFRESEARCH}/${encodeURIComponent(lineId)}`,
    delete: (lineId) => `${LINESOFRESEARCH}/${encodeURIComponent(lineId)}`,
  },
  permissions: {
    add: `${PERMISSIONS}`,
    list: (page = 0, resultsPerPage = 10, sort = '', name = '') => {
      let url = `${PERMISSIONS}?page=${page}&size=${resultsPerPage}&sort=${sort}`;
      if (name) {
        url += `&name=${name}`;
      }
      return url;
    },
    update: (permissionId) => `${PERMISSIONS}/${encodeURIComponent(permissionId)}`,
    readById: (permissionId) => `${PERMISSIONS}/${encodeURIComponent(permissionId)}`,
    delete: (permissionId) => `${PERMISSIONS}/${encodeURIComponent(permissionId)}`,
  }
};

export default routes;
