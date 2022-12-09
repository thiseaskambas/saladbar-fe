import { ICartItem } from './cart.types';
import { IProduct } from './product.types';
import { IUser } from './user.types';

export interface IUpdateCart extends Omit<ILocalCart, 'items'> {
  existingItems: ICartItem[];
  newItems: ILocalCartItemFormated[];
}

export interface ILocalCart {
  items: ILocalCartItem[];
  discount: number;
  totalItems: number;
  createdBy?: IUser['id'];
}

export interface ILocalCartToBeSaved {
  items: ILocalCartItemFormated[];
  discount?: number;
}

export interface ILocalCartItemFormated {
  product: IProduct['id'];
  quantity: number;
  discount?: number;
}

export interface ILocalCartItem {
  product: IProduct;
  quantity: number;
  discount?: number;
}
