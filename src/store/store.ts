import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import productsReducer from './products.slice';
import authReducer from './auth.slice';
import notifReducer from './notification.slice';
import cartReducer from './cart.slice';
import cartsReducer from './carts.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    notification: notifReducer,
    cart: cartReducer,
    carts: cartsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
