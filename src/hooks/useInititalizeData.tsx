/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import {
  resetNotification,
  setNotification,
} from '../store/notification.slice';
import { useAppDispatch } from '../store/store';

export const useInitializeData = (
  action: any,
  optionsObj: any,
  status: any,
  resetAction?: any
) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    let isMounted = true;
    const initData = async () => {
      try {
        dispatch(setNotification({ text: 'Hold on...', type: 'loading' }));
        await dispatch(action(optionsObj)).unwrap();
        dispatch(resetNotification());
      } catch (err: any) {
        dispatch(setNotification({ text: err.message, type: 'error' }));
      }
    };
    if (isMounted && status !== 'loading') {
      initData();
    }
    return () => {
      resetAction && dispatch(resetAction());
      isMounted = false;
    };
  }, [optionsObj]);
};
