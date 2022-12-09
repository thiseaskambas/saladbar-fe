import { createSlice } from '@reduxjs/toolkit';
import { IUpdateCart } from '../types/localCart.types';

const initialState: IUpdateCart = {
  existingItems: [],
  discount: 0,
  newItems: [],
  totalItems: 0,
};

const cartUpdateSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initCartUpdate(state, action) {
      state.existingItems = [...action.payload.items];
      state.discount = action.payload?.discount || 0;
      state.newItems = [];
    },
    addNewItem(state, action) {
      const index = state.newItems.findIndex(
        (pr) => pr.product === action.payload
      );
      if (index === -1) {
        state.newItems.push({
          product: action.payload,
          quantity: 1,
        });
      } else {
        state.newItems[index].quantity += 1;
      }
      state.totalItems += 1;
      return state;
    },
    removeNewItem(state, action) {
      const temp = state.newItems.map((el) =>
        el.product === action.payload && el.quantity > 0
          ? { ...el, quantity: el.quantity - 1 }
          : el
      );
      state.newItems = [...temp];
      state.totalItems -= 1;
      return state;
    },
    removeExistingItem(state, action) {
      console.log('removing from ', action.payload);
      const temp = state.existingItems.map((el) =>
        el.product.id === action.payload && el.quantity > 0
          ? { ...el, quantity: el.quantity - 1 }
          : el
      );
      state.existingItems = [...temp];
      state.totalItems -= 1;
      return state;
    },
    addExistingItem(state, action) {
      const index = state.existingItems.findIndex(
        (pr) => pr.product.id === action.payload
      );
      if (index === -1) {
        return state;
      } else {
        state.existingItems[index].quantity += 1;
      }
      state.totalItems += 1;
      return state;
    },
  },
});

export const {
  addNewItem,
  removeNewItem,
  addExistingItem,
  initCartUpdate,
  removeExistingItem,
} = cartUpdateSlice.actions;
export default cartUpdateSlice.reducer;
