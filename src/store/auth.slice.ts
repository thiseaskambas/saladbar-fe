import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  IAuthInitialState,
  ILoginCredentials,
  ILoginResponse,
  IUser,
} from '../types/user.types';
import authServices from '../services/auth.services';

const initialState = {
  user: {},
  status: 'idle',
  accessToken: '',
} as IAuthInitialState;

export const logUserIn = createAsyncThunk(
  'auth/login',
  async (credentials: ILoginCredentials): Promise<ILoginResponse> => {
    const response = await authServices.logIn(credentials);
    return response;
  }
);

export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
  const response = await authServices.refreshToken();
  return response;
});

export const logUserOut = createAsyncThunk('auth/logOut', async () => {
  const response = await authServices.logOut();
  return response.status;
});

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
        state.user = action.payload.loggedUser;
        state.accessToken = action.payload.accessToken;
        state.status = 'succeeded';
      })
      .addCase(logUserIn.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.loggedUser;
        state.status = 'succeeded';
      })
      .addCase(refreshToken.rejected, (state) => {
        state.status = 'failed';
        state.accessToken = '';
        state.user = {} as IUser;
      })
      .addCase(logUserOut.fulfilled, (state) => {
        state.accessToken = '';
        state.user = {} as IUser;
        state.status = 'idle';
      })
      .addCase(logUserOut.rejected, (state) => {
        state.status = 'idle';
        state.accessToken = '';
        state.user = {} as IUser;
      });
  },
});

export default authSlice.reducer;
