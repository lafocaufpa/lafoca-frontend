
const handleRequestError = (error) => {
  if (error.response?.status === 401) {
    return error.response;
  }
  throw error.response?.data;
};

export default handleRequestError;