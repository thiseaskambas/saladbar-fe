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

    // window.localStorage.setItem(
    //   'loggedSaladBarAppUser',
    //   JSON.stringify(response)
    // );

    return response;
  }
);

export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
  const response = await authServices.refreshToken();
  return response;
});

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
    setNewToken(state, action) {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logUserIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logUserIn.fulfilled, (state, action) => {
        // authServices.setToken(action.payload.accessToken);
        state.user = action.payload.loggedUser;
        state.accessToken = action.payload.accessToken;
        state.status = 'succeeded';
      })
      .addCase(logUserIn.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(refreshToken.pending, () => {
        // authServices.setToken(action.payload.accessToken);
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        // authServices.setToken(action.payload.accessToken);
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.loggedUser;
        state.status = 'succeeded';
      })
      .addCase(refreshToken.rejected, (state) => {
        state.status = 'failed';

        state.accessToken = '';
        state.user = {} as IUser;
      });
  },
});

export const { findUserFromStoredLoginResponse, setNewToken } =
  authSlice.actions;
export default authSlice.reducer;
