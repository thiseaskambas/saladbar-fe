import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import productsReducer from './products.slice';
import authReducer from './auth.slice';
import notifReducer from './notification.slice';
import cartReducer from './cart.slice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    notification: notifReducer,
    cart: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
