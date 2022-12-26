import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import helpers from '../utils/functionHelpers';
import {
  getCartsForStats,
  initializeCarts,
  resetCarts,
} from '../store/carts.slice';
import { RootState, useAppDispatch } from '../store/store';
import TodayCharts from '../components/TodayCharts';
import { StyledTodayMain } from './styles/today.styles';

const Today = () => {
  const cartsState = useSelector((state: RootState) => state.carts);
  const dispatch = useAppDispatch();

  console.log({ cartsState });

  useEffect(() => {
    let isMounted = true;
    const initCarts = async () => {
      const dayStart = helpers.convertToLocalStartDayTime(new Date());
      const dayEnd = helpers.convertToLocalEndDayTime(new Date());
      const lastWeekStart = helpers.convertToOneWeekAgo('start');
      const lastWeekEnd = helpers.convertToOneWeekAgo('end');

      try {
        await Promise.all([
          dispatch(initializeCarts({ after: dayStart, before: dayEnd })),
          dispatch(
            getCartsForStats({ after: lastWeekStart, before: lastWeekEnd })
          ),
        ]);
      } catch (err) {
        console.log({ err });
      }
    };
    if (
      isMounted &&
      cartsState.status !== 'loading' &&
      cartsState.tempCartsStatus !== 'loading'
    ) {
      initCarts();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const ready =
    cartsState.tempCartsStatus === 'succeeded' &&
    cartsState.status === 'succeeded';

  return (
    <StyledTodayMain>
      {ready && <TodayCharts cartsState={cartsState} />}
    </StyledTodayMain>
  );
};

export default Today;
