import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import messageServices from '../services/message.services';
import { IMessageState } from '../types/message.types';

const initialState: IMessageState = {
  status: 'idle',
  messages: [],
};

export const getLatestMessage = createAsyncThunk(
  'message/gatLatest',
  async () => {
    const response = await messageServices.getLatest();
    return response.data;
  }
);

export const createMessage = createAsyncThunk(
  'message/createOne',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (input: any) => {
    const response = await messageServices.createOne(input);
    return response.data;
  }
);

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLatestMessage.fulfilled, (state, action) => {
        state.messages = [action.payload];
        state.status = 'succeeded';
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.messages = [action.payload];
        state.status = 'succeeded';
      });
  },
});

export default messageSlice.reducer;
