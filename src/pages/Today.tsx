import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCartsForStats, initializeCarts } from '../store/carts.slice';
import { RootState, useAppDispatch } from '../store/store';
import functionHelpers from '../utils/functionHelpers';

const Today = () => {
  const cartsState = useSelector((state: RootState) => state.carts);
  const userState = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;
    const initCarts = async () => {
      const dayStart = functionHelpers.convertToUTCStartDayString(new Date());
      const dayEnd = functionHelpers.convertToUTCEndDayString(new Date());
      const lastWeekStart = functionHelpers.convertToOneWeekAgo('start');
      const lastWeekEnd = functionHelpers.convertToOneWeekAgo('end');

      try {
        await Promise.all([
          dispatch(
            initializeCarts({ after: dayStart, before: dayEnd })
          ).unwrap(),
          dispatch(
            getCartsForStats({ after: lastWeekStart, before: lastWeekEnd })
          ).unwrap(),
        ]);
      } catch (err) {
        console.log(err);
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

  const totalProductsSoldToday = functionHelpers.calcCartStateTotalProducts(
    cartsState.carts
  );
  const totalProductsLastWeekday = functionHelpers.calcCartStateTotalProducts(
    cartsState.tempCartsForStats
  );
  const totalRevenueToday = functionHelpers.calcCartStateTotalPrice(
    cartsState.carts
  );
  const totalRevenueLastWeekday = functionHelpers.calcCartStateTotalPrice(
    cartsState.tempCartsForStats
  );

  const weekday = functionHelpers.getUTCDayName();

  return (
    <main>
      <div>Hello {userState.user.username} !</div>
      <div>
        Today {totalProductsSoldToday} products were sold to{' '}
        {cartsState.totalCarts} customer{cartsState.totalCarts > 1 && 's'}.
        Total revenue is €{totalRevenueToday}
      </div>
      <div>
        On last {weekday}, {totalProductsLastWeekday} products were sold to{' '}
        {cartsState.tempTotalCarts} customer
        {cartsState.tempTotalCarts > 1 && 's'}. Total revenue was €
        {totalRevenueLastWeekday}
      </div>
    </main>
  );
};

export default Today;
