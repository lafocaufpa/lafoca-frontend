
const handleRequestError = (error) => {
  if (error.response && error.response.status === 401) {
    console.error('Erro de autenticação: ');
   
    throw error.response.data;
  }

  throw error.response.data;
};

export default handleRequestError;