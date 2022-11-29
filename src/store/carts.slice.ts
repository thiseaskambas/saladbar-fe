import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cartsServices from '../services/carts.services';
import { ICartProduct, ICartsInitialState } from '../types/cart.types';

const initialState: ICartsInitialState = {
  carts: [],
  status: 'idle',
};

export const createOneCart = createAsyncThunk(
  'carts/create',
  async (cart: ICartProduct[]) => {
    const response = await cartsServices.createOne(cart);
    console.log(response);
    return response;
  }
);

const cartsSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOneCart.fulfilled, () => {
      console.log('success');
    });
  },
});

export default cartsSlice.reducer;
