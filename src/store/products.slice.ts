import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProduct, IProductsInitialState } from '../types/product.types';

import productServices from '../services/product.services';

const initialState = {
  products: [],
  status: 'idle',
} as IProductsInitialState;

export const initializeProducts = createAsyncThunk(
  'products/initializeProducts',
  async () => {
    const { data } = await productServices.getAll();
    return data as IProduct[];
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
      })
      .addCase(initializeProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products.push(...action.payload);
      });
  },
});

export default productsSlice.reducer;
