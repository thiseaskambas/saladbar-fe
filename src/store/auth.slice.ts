import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  IAuthInitialState,
  ILoginCredentials,
  ILoginResponse,
} from '../types/user.types';
import authServices from '../services/auth.services';

const initialState: IAuthInitialState = {
  user: null,
  status: 'idle',
  accessToken: '',
  persist: false,
};

export const logUserIn = createAsyncThunk(
  'auth/login',
  async (credentials: ILoginCredentials): Promise<ILoginResponse> => {
    const response = await authServices.logIn(credentials);

    return { ...response, persist: credentials.rememberMe };
  }
);
export const signupUser = createAsyncThunk(
  'auth/signup',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (inputObj: any) => {
    const response = await authServices.signup(inputObj);

    return response.data;
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
export const updatePwd = createAsyncThunk(
  'auth/updatePwd',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (inputObj: any) => {
    const response = await authServices.updatePassword(inputObj);
    return response.status;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateLoggedUser(state, action) {
      state.user = action.payload;
    },
  },
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
      .addCase(signupUser.fulfilled, (_state, action) => {
        //TODO: complete
        console.log(action.payload);
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
        state.user = null;
      })
      .addCase(logUserOut.fulfilled, (state) => {
        state.accessToken = '';
        state.user = null;
        state.status = 'idle';
      })
      .addCase(logUserOut.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logUserOut.rejected, (state) => {
        state.accessToken = '';
        state.status = 'idle';
        state.user = null;
      });
  },
});

export const { updateLoggedUser } = authSlice.actions;
export default authSlice.reducer;
