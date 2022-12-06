import axios from '../utils/axios';
import {
  ICartProduct,
  INewCartEntry,
  IPaginationOptions,
} from '../types/cart.types';

const formatCart = (cart: ICartProduct[]): INewCartEntry => {
  const items = cart.map((el) => {
    return { product: el.product.id, quantity: el.quantity };
  });
  return { items, discount: 0 };
};

const createOne = async (cart: ICartProduct[]) => {
  const formated = formatCart(cart);
  const response = await axios.axiosPrivate.post(`/carts/`, formated);
  return response.data.data;
};

const initializeCarts = async (pageOptions: IPaginationOptions) => {
  const response = await axios.axiosPrivate.get(`/carts`, {
    params: pageOptions,
  });
  return response.data;
};

export default { createOne, formatCart, initializeCarts };
