import { IProduct } from './product.types';
import { IUser } from './user.types';

export interface ICart extends Omit<INewCartEntry, 'items'> {
  items: ICartItem[];
  createdAt: Date;
  lastEdited?: ILastEdited;
  totalPriceBeforeDiscount: number;
  totalPrice: number;
  active: boolean;
}

export interface INewCartEntry {
  items: ICartItemEntry[];
  discount: number;
  createdBy: IUser['id'];
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
  discount: number;
}

export interface ILastEdited {
  editedBy: IUser['id'];
  editDate: Date;
}

interface ICartProducts {
  product: IProduct;
  quantity: number;
}

export interface ICartInitialState {
  products: ICartProducts[];
  totalItems: number;
}
