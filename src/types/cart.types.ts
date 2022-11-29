import { IProduct } from './product.types';
import { IUser } from './user.types';

export interface ICart extends Omit<INewCartEntry, 'items'> {
  items: ICartItem[];
  createdBy: IUser['id'];
  createdAt: Date;
  lastEdited?: ILastEdited;
  totalPriceBeforeDiscount: number;
  totalPrice: number;
  active: boolean;
}

export interface INewCartEntry {
  items: ICartItemEntry[];
  discount: number;
}

export interface ICartItem extends ICartItemEntry {
  itemPrice: number;
  itemPriceBeforeDiscount: number;
  totalPriceBeforeDiscount: number;
  totalPrice: number;
}
export interface ICartItemEntry {
  product: IProduct['id'];
  quantity: number;
  discount?: number;
}

export interface ILastEdited {
  editedBy: IUser['id'];
  editDate: Date;
}

export interface ICartProduct {
  product: IProduct;
  quantity: number;
  discount?: number;
}

export interface ICartInitialState {
  products: ICartProduct[];
  discount: number;
  totalItems: number;
}

export interface ICartsInitialState {
  carts: ICart[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}