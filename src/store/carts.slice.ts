import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cartsServices from '../services/carts.services';
import {
  ICart,
  ICartProduct,
  ICartsInitialState,
  IInitCartsResponse,
  IPaginationOptions,
} from '../types/cart.types';

const initialState: ICartsInitialState = {
  carts: [],
  totalCarts: 0,
  status: 'idle',
};

export const createOneCart = createAsyncThunk(
  'carts/create',
  async (cart: ICartProduct[]): Promise<ICart> => {
    const response = await cartsServices.createOne(cart);
    return response.data;
  }
);

export const initializeCarts = createAsyncThunk(
  'carts/initialize',
  async (pageOptions: IPaginationOptions): Promise<IInitCartsResponse> => {
    const response = await cartsServices.initializeCarts(pageOptions);
    return response.data;
  }
);

const cartsSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOneCart.fulfilled, (state, action) => {
        state.carts.push(action.payload);
        state.totalCarts += 1;
      })
      .addCase(initializeCarts.fulfilled, (state, action) => {
        state.carts = action.payload.data;
        state.totalCarts = action.payload.count;
        state.status = 'succeeded';
      });
  },
});

export default cartsSlice.reducer;
