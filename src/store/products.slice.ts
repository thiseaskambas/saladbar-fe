import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProduct, IProductsInitialState } from '../types/product.types';

import productServices from '../services/product.services';

const initialState = {
  products: [],
  status: 'idle',
} as IProductsInitialState;

export const initializeProducts = createAsyncThunk(
  'products/initializeProducts',
  async (): Promise<IProduct[]> => {
    const response = await productServices.getAll();

    return response.data;
  }
);

export const createProduct = createAsyncThunk(
  'products/createOne',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (input: any): Promise<IProduct> => {
    const response = await productServices.createOne(input);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateOne',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (inputObj: any): Promise<IProduct> => {
    const response = await productServices.updateOne(inputObj);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteOne',
  async (id: IProduct['id']) => {
    const response = await productServices.deleteOne(id);
    return { data: response.data, id };
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeProducts.pending, (state) => {
        state.status = 'loading';
        state.products = [];
      })
      .addCase(initializeProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(initializeProducts.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const temp = state.products.filter((pr) => pr.id !== action.payload.id);
        state.products = temp;
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const temp = state.products.map((pr) =>
          pr.id === action.payload.id ? { ...action.payload } : pr
        );
        state.products = temp;
        state.status = 'succeeded';
      })
      .addCase(createProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProduct.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.status = 'succeeded';
      });
  },
});

export default productsSlice.reducer;
