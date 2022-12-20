import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import usersServices from '../services/users.services';
import { IUser, IUsersState } from '../types/user.types';

const initialState: IUsersState = {
  users: [],
  status: 'idle',
};

export const initializeUsers = createAsyncThunk(
  'users/initialize',
  async (): Promise<IUser[]> => {
    const response = await usersServices.initializeUsers();
    return response.data;
  }
);

export const findOneUser = createAsyncThunk(
  'users/findOne',
  async (id: IUser['id']): Promise<IUser> => {
    const response = await usersServices.getOne(id);
    return response.data;
  }
);
export const updateOneUser = createAsyncThunk(
  'users/editOne',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (payloadObj: any): Promise<IUser> => {
    const response = await usersServices.updateOne(payloadObj);
    return response.data;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(findOneUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = [action.payload];
      })
      .addCase(updateOneUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const temp = state.users.map((usr) =>
          usr.id === action.payload.id ? action.payload : usr
        );
        state.users = temp;
      });
  },
});

export default usersSlice.reducer;
