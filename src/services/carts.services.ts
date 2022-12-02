import axios from '../utils/axios';
import { ICartProduct, INewCartEntry } from '../types/cart.types';

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

const initializeCarts = async () => {
  const response = await axios.axiosPrivate.get(`/carts`);
  return response.data.data;
};

export default { createOne, formatCart, initializeCarts };
