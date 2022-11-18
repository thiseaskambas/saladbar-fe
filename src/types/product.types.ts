export enum ProductCourseType {
  Starter = 'starter',
  Main = 'main',
  Side = 'side',
  Desert = 'desert',
  Drink = 'drink',
  Other = 'other',
}

export interface INewProductEntry {
  name: string;
  price: number;
  productCourseType: ProductCourseType;
  image: IProductImage;
}
export interface IProduct extends INewProductEntry {
  active: boolean;
}

export interface IUpdateProductEntry {
  name?: string;
  price?: number;
  productCourseType?: ProductCourseType;
  active?: boolean;
  image?: IProductImage;
}

export interface IProductImage {
  url: string;
  filename: string;
  public_id: string;
  secure_url: string;
}

export interface IProductsInitialState {
  products: IProduct[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
