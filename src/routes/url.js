const MEMBROS = '/membros';
const PROJETOS = '/projetos';
const TCCS = '/tccs';
const ARTIGOS = '/artigos';
const ADMIN = '/admin';
const USUARIO = '/usuario';
const MEMBRO = '/membro';

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
    }
  },
  redes: {
    instagram: `${INSTAGRAM}`,
    facebook: `${FACEBOOK}`,
    linkedin: `${LINKEDIN}`
  }
};

export default url;
