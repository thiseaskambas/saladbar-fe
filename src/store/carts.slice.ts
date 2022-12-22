import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cartsServices from '../services/carts.services';
import {
  ICart,
  ICartsState,
  IInitCartsResponse,
  IPaginationOptions,
  IUpdateCartDataToSend,
} from '../types/cart.types';
import { ILocalCartItem } from '../types/localCart.types';

const initialState: ICartsState = {
  carts: [],
  totalCarts: 0,
  status: 'idle',
  tempCartsForStats: [],
  tempTotalCarts: 0,
  tempCartsStatus: 'idle',
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

export const getCartsForStats = createAsyncThunk(
  'carts/getTempCarts',
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

export const updateCart = createAsyncThunk(
  'carts/updateOne',
  async (cartIdObj: IUpdateCartDataToSend): Promise<ICart> => {
    const response = await cartsServices.updateOne(cartIdObj);
    console.log(response.data.data);
    return response.data.data;
  }
);

const cartsSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    resetCarts() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOneCart.fulfilled, (state, action) => {
        state.carts.push(action.payload);
        state.totalCarts += 1;
      })
      .addCase(initializeCarts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initializeCarts.fulfilled, (state, action) => {
        state.carts = action.payload.data;
        state.totalCarts = action.payload.count;
        state.status = 'succeeded';
      })
      .addCase(getCartsForStats.fulfilled, (state, action) => {
        state.tempCartsForStats = action.payload.data;
        state.tempTotalCarts = action.payload.count;
        state.tempCartsStatus = 'succeeded';
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        const temp = state.carts.filter(
          (crt) => crt.id !== action.payload.cartId
        );
        state.carts = temp;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        const temp = state.carts.map((cart) =>
          cart.id === action.payload.id ? action.payload : cart
        );
        state.carts = temp;
      });
  },
});

export const { resetCarts } = cartsSlice.actions;

export default cartsSlice.reducer;
