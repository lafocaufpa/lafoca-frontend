const HOME = '/';
const MEMBERS = '/members';
const PROJECTS = '/projects';
const LAFOCA = '/info';
const USERS = '/users';

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
  projects:{
    listSummarized: `${PROJECTS}/summarized`
  },
  lafoca: {
    listInfo: `${LAFOCA}` 
  },
  users: {
    list: `${USERS}`
  }
};

export default routes;
