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
  async (input: any) => {
    const response = await productServices.createOne(input);
    return response.data;
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
        state.products = [...action.payload];
      })
      .addCase(initializeProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default productsSlice.reducer;
