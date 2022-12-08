import { createSlice } from '@reduxjs/toolkit';
import { IUpdateCart } from '../types/cart.types';

const initialState: IUpdateCart = {
  existingItems: [],
  totalItems: 0,
  discount: 0,
  newEntries: {
    items: [],
  },
};

const cartUpdateSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initCart(state, action) {
      state.existingItems.push(action.payload.products);
      state.totalItems = action.payload.totalItems;
      state.discount = action.payload.discount;
    },
    // addToCart(state, action) {
    //   const index = state.newEntries.items.findIndex(
    //     (pr) => pr.product === action.payload.product.id
    //   );
    //   if (index === -1) {
    //     state.products.push({
    //       product: action.payload.product,
    //       quantity: action.payload.quantity,
    //     });
    //   } else {
    //     state.products[index].quantity += action.payload.quantity;
    //   }
    //   state.totalItems += action.payload.quantity;
    //   return state;
    // },
    // removeFromCart(state, action) {
    //   const temp = state.products.map((el) =>
    //     el.product.id === action.payload && el.quantity > 0
    //       ? { ...el, quantity: el.quantity - 1 }
    //       : el
    //   );
    //   state.products = temp;
    //   state.totalItems -= 1;
    //   return state;
    // },
    resetCart() {
      return initialState;
    },
  },
});

// export const { addToCart, removeFromCart, resetCart, initCart } =
// cartUpdateSlice.actions;
export default cartUpdateSlice.reducer;
