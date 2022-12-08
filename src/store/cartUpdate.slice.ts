import { createSlice } from '@reduxjs/toolkit';
import { IUpdateCart } from '../types/localCart.types';

const initialState: IUpdateCart = {
  existingItems: [],
  totalItems: 0,
  discount: 0,
  newItems: [],
};

const cartUpdateSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initCart(state, action) {
      state.existingItems.push(action.payload.products);
      state.totalItems = action.payload.totalItems;
      state.discount = action.payload?.discount || 0;
    },
    addNewItem(state, action) {
      const index = state.newItems.findIndex(
        (pr) => pr.product === action.payload.productID
      );
      if (index === -1) {
        state.newItems.push({
          product: action.payload.product,
          quantity: action.payload.quantity,
        });
      } else {
        state.newItems[index].quantity += action.payload.quantity;
      }
      state.totalItems += action.payload.quantity;
      return state;
    },
    removeNewItem(state, action) {
      const temp = state.newItems.map((el) =>
        el.product === action.payload.productID && el.quantity > 0
          ? { ...el, quantity: el.quantity - 1 }
          : el
      );
      state.newItems = [...temp];
      state.totalItems -= 1;
      return state;
    },
    resetCart() {
      return initialState;
    },
  },
});

// export const { addToCart, removeFromCart, resetCart, initCart } =
// cartUpdateSlice.actions;
export default cartUpdateSlice.reducer;
