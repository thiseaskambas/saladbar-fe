import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cartsServices from '../services/carts.services';
import { ICart, ICartProduct, ICartsInitialState } from '../types/cart.types';

const initialState: ICartsInitialState = {
  carts: [],
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
  async (): Promise<ICart[]> => {
    const response = await cartsServices.initializeCarts();
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
      })
      .addCase(initializeCarts.fulfilled, (state, action) => {
        state.carts = action.payload;
      });
  },
});

export default cartsSlice.reducer;
