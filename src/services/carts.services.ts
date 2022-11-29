import axios from '../utils/axios';
import { ICart, ICartProduct, INewCartEntry } from '../types/cart.types';

const formatCart = (cart: ICartProduct[]): INewCartEntry => {
  console.log(cart);
  const items = cart.map((el) => {
    return { product: el.product.id, quantity: el.quantity };
  });
  return { items, discount: 0 };
};

const createOne = async (cart: ICartProduct[]): Promise<ICart> => {
  const response = await axios.axiosPrivate.post(`/carts/`, formatCart(cart));
  return response.data;
};

export default { createOne, formatCart };
