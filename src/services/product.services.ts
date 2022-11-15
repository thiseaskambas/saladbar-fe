import axios from '../utils/axios';

const getAll = async () => {
  const response = await axios.axiosPrivate.get(`/products`);

  return response.data.data;
};

export default { getAll };
