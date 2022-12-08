import { IProduct } from './product.types';
import { IUser } from './user.types';

export interface ICart {
  items: ICartItem[];
  createdBy: IUser;
  createdAt: string;
  lastEdited?: ILastEdited;
  totalPriceBeforeDiscount: number;
  totalPrice: number;
  active: boolean;
  id: string;
  discount?: number;
}

export interface ILastEdited {
  editedBy: IUser['id'];
  editDate: Date;
}

export interface ICartItem {
  product: IProduct;
  itemPrice: number;
  itemPriceBeforeDiscount: number;
  totalPriceBeforeDiscount: number;
  totalPrice: number;
  quantity: number;
  discount?: number;
}

export interface ICartsState {
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
