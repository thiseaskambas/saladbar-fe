import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cartsServices from '../services/carts.services';
import {
  ICart,
  ICartsState,
  IInitCartsResponse,
  IPaginationOptions,
} from '../types/cart.types';
import { ILocalCartItem } from '../types/localCart.types';

const initialState: ICartsState = {
  carts: [],
  totalCarts: 0,
  status: 'idle',
};

export const createOneCart = createAsyncThunk(
  'carts/create',
  async (cart: ILocalCartItem[]): Promise<ICart> => {
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

export const deleteCart = createAsyncThunk(
  'carts/deleteOne',
  async (cartId: ICart['id']) => {
    const response = await cartsServices.deleteOne(cartId);
    return { data: response.data, cartId };
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
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        const temp = state.carts.filter(
          (crt) => crt.id !== action.payload.cartId
        );
        state.carts = [...temp];
      });
  },
});

export default cartsSlice.reducer;
