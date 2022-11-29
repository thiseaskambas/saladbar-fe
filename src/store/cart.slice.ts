import { createSlice } from '@reduxjs/toolkit';
import { ICartInitialState } from '../types/cart.types';

const initialState: ICartInitialState = {
  products: [],
  totalItems: 0,
  discount: 0,
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
      const temp = state.products.map((el) =>
        el.product.id === action.payload && el.quantity > 0
          ? { ...el, quantity: el.quantity - 1 }
          : el
      );
      state.products = temp;
      state.totalItems -= 1;
      return state;
    },
    resetCart() {
      return initialState;
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
