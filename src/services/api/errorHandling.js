const handleRequestError = (error) => {
  console.error('Erro na comunicação com o backend:', error);
  throw error;
};

export default handleRequestError;
