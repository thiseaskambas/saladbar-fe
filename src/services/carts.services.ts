import axios from '../utils/axios';
import {
  ICart,
  IPaginationOptions,
  IUpdateCartDataToSend,
} from '../types/cart.types';
import {
  ILocalCartItem,
  ILocalCartItemFormated,
  ILocalCartToBeSaved,
} from '../types/localCart.types';

const formatCart = (cart: ILocalCartItem[]): ILocalCartToBeSaved => {
  const items: ILocalCartItemFormated[] = cart.map((el) => {
    return { product: el.product.id, quantity: el.quantity };
  });
  return { items, discount: 0 };
};

const createOne = async (cart: ILocalCartItem[]) => {
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

const deleteOne = async (id: ICart['id']) => {
  const response = await axios.axiosPrivate.delete(`/carts/${id}`);
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateOne = async (inputObj: IUpdateCartDataToSend) => {
  const response = await axios.axiosPrivate.patch(
    `/carts/${inputObj.id}`,
    inputObj.cart
  );
  return response.data;
};

export default { createOne, formatCart, initializeCarts, deleteOne, updateOne };
