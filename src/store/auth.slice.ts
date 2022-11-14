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
} as IAuthInitialState;

export const logUserIn = createAsyncThunk(
  'auth/login',
  async (credentials: ILoginCredentials): Promise<IUser> => {
    const response = await authServices.logIn(credentials);
    authServices.setToken(response.accessToken);
    window.localStorage.setItem(
      'loggedSaladBarAppUser',
      JSON.stringify(response)
    );
    return response.loggedUser;
  }
);

// export const test = createAsyncThunk(
//   'auth/findUserFromStoredLoginResponse',
//   async () => {
//     const storedLoginResponse = window.localStorage.getItem(
//       'loggedSaladBarAppUser'
//     );
//     if (storedLoginResponse) {
//       const parsed: ILoginResponse = JSON.parse(storedLoginResponse);
//       state.user = parsed.loggedUser;
//       state.status = 'succeeded';
//       authServices.setToken(parsed.accessToken);
//     }
//   }
// );

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    findUserFromStoredLoginResponse(state) {
      const storedLoginResponse = window.localStorage.getItem(
        'loggedSaladBarAppUser'
      );
      if (storedLoginResponse) {
        const parsed: ILoginResponse = JSON.parse(storedLoginResponse);
        state.user = parsed.loggedUser;
        state.status = 'succeeded';
        authServices.setToken(parsed.accessToken);
      }
    },
  },
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

export const { findUserFromStoredLoginResponse } = authSlice.actions;
export default authSlice.reducer;
