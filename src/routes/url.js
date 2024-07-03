const MEMBROS = '/membros';
const PROJETOS = '/projetos';
const TCCS = '/tccs';
const ARTIGOS = '/artigos';
const ADMIN = '/admin';
const USUARIO = '/usuario';
const MEMBRO = '/membro';
const LINHADEPESQUISA = '/linha-de-pesquisa';
const FUNCOES = '/funcoes';
const SKILLS = '/habilidades';
const CLASSES = '/turmas';

const INSTAGRAM ='https://www.instagram.com/lafocameta/';
const FACEBOOK ='https://www.facebook.com/lafocameta/';
const LINKEDIN ='https://www.linkedin.com/company/lafoca-laboratório-de-abordagens-de-ensino-focada-no-aluno/';

const url = {
  auth: {
    login: '/login/',
  },
  homepage: '/',
  membros: {
    buscarPeloSlug: (slug) => `${MEMBROS}/${encodeURIComponent(slug)}`,
    listarMembros: `${MEMBROS}`
  },
  projetos: {
    listarProjetos: `${PROJETOS}`
  },
  tccs: {
    listarTccs: `${TCCS}`
  },
  artigos: {
    listarArtigos: `${ARTIGOS}`
  },
  admin: {// /admin vai ser o ponto de entrada da area de administração do CMS, se for alterado, terá que ser alterado no middleware
    home: `${ADMIN}`,

    usuario: {
      home: `${ADMIN}${USUARIO}`,
      editar: (userId) => `editar/${encodeURIComponent(userId)}`,
      adicionar: 'adicionar'
    },
    membro: {
      home: `${ADMIN}${MEMBRO}`,
      editar: (memberId) => `editar/${encodeURIComponent(memberId)}`,
      adicionar: 'adicionar'
    },
    linhadepesquisa: {
      home: `${ADMIN}${LINHADEPESQUISA}`,
      editar: (lineId) => `editar/${encodeURIComponent(lineId)}`,
      adicionar: 'adicionar'
    },
    funcoes: {
      home: `${ADMIN}${FUNCOES}`,
      editar: (functionId) => `editar/${encodeURIComponent(functionId)}`,
      adicionar: 'adicionar'
    },
    habilidades: {
      home: `${ADMIN}${SKILLS}`,
      editar: (skillId) => `editar/${encodeURIComponent(skillId)}`,
    },
    turmas : {
      home: `${ADMIN}${CLASSES}`,
      editar: (turmaId) => `editar/${encodeURIComponent(turmaId)}`,
    },
    tccs: {
      home: `${ADMIN}${TCCS}`,
      editar: (tccId) => `editar/${encodeURIComponent(tccId)}`,

    },
    artigos: {
      home: `${ADMIN}${ARTIGOS}`,
      editar: (articleId) => `editar/${encodeURIComponent(articleId)}`
    },
    projetos: {
      home: `${ADMIN}${PROJETOS}`,
      editar: (projectId) => `editar/${encodeURIComponent(projectId)}`
    }
  },
  redes: {
    instagram: `${INSTAGRAM}`,
    facebook: `${FACEBOOK}`,
    linkedin: `${LINKEDIN}`
  }
};

export default url;
