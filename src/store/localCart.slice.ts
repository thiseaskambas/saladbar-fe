import { createSlice } from '@reduxjs/toolkit';

import { ILocalCart } from '../types/localCart.types';

const initialState: ILocalCart = {
  items: [],
  totalItems: 0,
  discount: 0,
};

const localCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const index = state.items.findIndex(
        (pr) => pr.product.id === action.payload.product.id
      );
      if (index === -1) {
        state.items.push({
          product: action.payload.product,
          quantity: action.payload.quantity,
        });
      } else {
        state.items[index].quantity += action.payload.quantity;
      }
      state.totalItems += action.payload.quantity;
      return state;
    },
    removeFromCart(state, action) {
      const tempArr = state.items.reduce((acc, curr) => {
        if (curr.product.id !== action.payload) {
          acc.push(curr);
        } else if (curr.quantity > 1) {
          acc.push({ ...curr, quantity: curr.quantity - 1 });
        }
        return acc;
      }, [] as ILocalCart['items']);

      state.items = tempArr;
      state.totalItems -= 1;
      return state;
    },
    resetCart() {
      return initialState;
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = localCartSlice.actions;
export default localCartSlice.reducer;
