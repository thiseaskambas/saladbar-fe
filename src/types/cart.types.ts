import { ILocalCartToBeSaved } from './localCart.types';
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
  tempCartsForStats: ICart[];
  tempTotalCarts: number;
  tempCartsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface IPaginationOptions {
  page?: number;
  limit?: number;
  after?: string;
  before?: string;
}

export interface IInitCartsResponse {
  data: ICart[];
  count: number;
}

export interface IUpdateCartDataToSend {
  cart: ILocalCartToBeSaved;
  id: ICart['id'];
}
