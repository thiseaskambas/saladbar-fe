import { createSlice } from '@reduxjs/toolkit';
import { ICartInitialState } from '../types/cart.types';

const initialState: ICartInitialState = {
  products: [],
  totalItems: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const index = state.products.findIndex(
        (pr) => pr.product.id === action.payload.product.id
      );
      if (index === -1) {
        state.products.push({
          product: action.payload.product,
          quantity: action.payload.quantity,
        });
      } else {
        state.products[index].quantity += action.payload.quantity;
      }
      state.totalItems += action.payload.quantity;
      return state;
    },
    removeFromCart(state, action) {
      return state;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
