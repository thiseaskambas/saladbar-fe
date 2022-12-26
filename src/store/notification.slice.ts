import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { INotification } from '../types/notification.types';

interface IPayload {
  text: string;
  time: number;
  type: INotification['type'];
}

interface WaitSomeResponse {
  data: {
    text: string;
    type: INotification['type'];
  };
}

const initialState: INotification = {
  text: 'Testing notification',
  type: 'success',
};

const waitSome = (text: string, type: INotification['type'], time: number) => {
  return new Promise<WaitSomeResponse>((resolve) =>
    setTimeout(() => resolve({ data: { text, type } }), time * 1000)
  );
};

export const setAsyncNotification = createAsyncThunk(
  'notification/setNotification',
  async ({ text, time, type }: IPayload) => {
    const response = await waitSome(text, type, time);
    return response.data;
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (_state, action: PayloadAction<INotification>) => {
      return action.payload;
    },
    resetNotification(state) {
      state.text = '';
      state.type = 'none';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setAsyncNotification.pending, (state, { meta }) => {
        state.text = meta.arg.text;
        state.type = meta.arg.type;
      })
      .addCase(setAsyncNotification.fulfilled, (state) => {
        state.text = '';
        state.type = 'none';
      });
  },
});

export const { setNotification, resetNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
