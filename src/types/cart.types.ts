import { IProduct } from './product.types';
import { IUser } from './user.types';

export interface ICart extends Omit<INewCartEntry, 'items'> {
  items: ICartItem[];
  createdBy: IUser;
  createdAt: string;
  lastEdited?: ILastEdited;
  totalPriceBeforeDiscount: number;
  totalPrice: number;
  active: boolean;
  id: string;
}

export interface ILastEdited {
  editedBy: IUser['id'];
  editDate: Date;
}

export interface ICartItem extends Omit<ICartItemEntry, 'product'> {
  product: IProduct;
  itemPrice: number;
  itemPriceBeforeDiscount: number;
  totalPriceBeforeDiscount: number;
  totalPrice: number;
}

export interface INewCartEntry {
  items: ICartItemEntry[];
  discount?: number;
}

export interface ICartItemEntry {
  product: IProduct['id'];
  quantity: number;
  discount?: number;
}

export interface ICartProduct {
  product: IProduct;
  quantity: number;
  discount?: number;
}

export interface ICartsInitialState {
  carts: ICart[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  totalCarts: number;
}

export interface IPaginationOptions {
  page: number;
  limit: number;
}

export interface IInitCartsResponse {
  data: ICart[];
  count: number;
}

export interface ICartInitialState {
  products: ICartProduct[];
  discount: number;
  totalItems: number;
}

export interface IUpdateCart extends Omit<ICartInitialState, 'products'> {
  existingItems: ICartProduct[];
  newEntries: INewCartEntry;
}
