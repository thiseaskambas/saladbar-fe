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
  id: string;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isProductCourseType = (param: any): param is ProductCourseType => {
  return Object.values(ProductCourseType).includes(param);
};
