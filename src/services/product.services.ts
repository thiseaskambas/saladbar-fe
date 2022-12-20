/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProduct } from '../types/product.types';
import axios from '../utils/axios';

const getAll = async () => {
  const response = await axios.axiosPrivate.get(`/products/`);
  return response.data.data;
};

const createOne = async (input: any) => {
  const response = await axios.axiosPrivate.post(`/products/`, input, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
};

const updateOne = async (inputObj: any) => {
  const response = await axios.axiosPrivate.patch(
    `/products/${inputObj.id}`,
    inputObj.input,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return response.data.data;
};

const deleteOne = async (id: IProduct['id']) => {
  const response = await axios.axiosPrivate.delete(`/products/${id}`);
  return response.data;
};

export default { getAll, createOne, updateOne, deleteOne };
