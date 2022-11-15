import { createSlice } from '@reduxjs/toolkit';
import { INotifInitialState } from '../types/notification.types';

const initialState: INotifInitialState = {
  notificationText: '',
  notificationType: 'none',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
});

export default notificationSlice.reducer;
