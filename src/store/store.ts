import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import productsReducer from './products.slice';
import authReducer from './auth.slice';
import notifReducer from './notification.slice';
import cartReducer from './localCart.slice';
import cartsReducer from './carts.slice';
import updateCartReducer from './cartUpdate.slice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    notification: notifReducer,
    cart: cartReducer,
    carts: cartsReducer,
    updateCart: updateCartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
