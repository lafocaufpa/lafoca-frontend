
const handleRequestError = (error) => {
  if (error.response?.status === 401) {
    return error.response;
  }

  console.log(error.response.data);
  throw error.response?.data;
};

export default handleRequestError;