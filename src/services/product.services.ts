import axios from 'axios';

import authServices from './auth.services';
const baseUrl = '/api/v1/products';

const getAll = async () => {
  const token = authServices.getToken();
  const config = {
    headers: { authorization: token },
  };
  const response = await axios.get(baseUrl, config);

  return response.data.data;
};

export default { getAll };
