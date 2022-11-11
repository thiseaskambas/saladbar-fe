import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  IAuthInitialState,
  ILoginCredentials,
  IUser,
} from '../types/user.types';
import authServices from '../services/auth.services';

const initialState = {
  user: {},
  status: 'idle',
} as IAuthInitialState;

export const logUserIn = createAsyncThunk(
  'auth/login',
  async (credentials: ILoginCredentials) => {
    const logedUser = await authServices.logIn(credentials);
    console.log(logedUser);
    return logedUser as IUser;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logUserIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logUserIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(logUserIn.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default authSlice.reducer;
