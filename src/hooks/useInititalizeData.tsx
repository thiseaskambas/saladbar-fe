/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useAppDispatch } from '../store/store';

export const useInitializeData = (
  action: any,
  optionsObj: any,
  status: any
) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    let isMounted = true;

    const initData = async () => {
      try {
        await dispatch(action(optionsObj)).unwrap();
      } catch (err) {
        console.log(err);
      }
    };
    if (isMounted && status !== 'loading') {
      initData();
    }
    return () => {
      isMounted = false;
    };
  }, [optionsObj]);
};
