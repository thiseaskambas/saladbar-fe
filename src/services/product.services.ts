import axios from '../utils/axios';

const getAll = async () => {
  const response = await axios.axiosPrivate.get(`/products/`);
  return response.data.data;
};

const createOne = async (input: any) => {
  const response = await axios.axiosPrivate.post(`/products/`, input, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response;
};

export default { getAll, createOne };
