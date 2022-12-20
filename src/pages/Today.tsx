import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import useMeasure from 'react-use-measure';

import { getCartsForStats, initializeCarts } from '../store/carts.slice';
import { RootState, useAppDispatch } from '../store/store';
import helpers from '../utils/functionHelpers';
import {
  StatsCtnDiv,
  StyledBarCtnDiv,
  StyledH1,
  StyledH2,
} from './styles/today.styles';
import CounterDiv from '../components/TodayCounter';

const Today = () => {
  const cartsState = useSelector((state: RootState) => state.carts);

  const dispatch = useAppDispatch();
  const [ref, { width }] = useMeasure();

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

  const stats = useMemo(
    () => ({
      totalProductsSoldToday: helpers.calcCartStateTotalProducts(
        cartsState.carts
      ),
      totalProductsLastWeekday: helpers.calcCartStateTotalProducts(
        cartsState.tempCartsForStats
      ),
      totalRevenueToday: helpers.calcCartStateTotalPrice(cartsState.carts),
      totalRevenueLastWeekday: helpers.calcCartStateTotalPrice(
        cartsState.tempCartsForStats
      ),
    }),
    [cartsState.carts, cartsState.tempCartsForStats]
  );

  const weekday = helpers.getUTCDayName();
  if (cartsState.tempCartsStatus === 'idle' || cartsState.status === 'idle') {
    return null;
  }
  if (
    cartsState.tempCartsStatus === 'loading' ||
    cartsState.status === 'loading'
  ) {
    return null;
  }
  return (
    <main>
      <StyledH1>
        <span className="today">Today </span>
        <span className="vs">VS </span>
        <span className="last">Last {weekday}</span>
      </StyledH1>
      <StatsCtnDiv ref={ref}>
        <StyledH2>Products sold </StyledH2>
        <StyledBarCtnDiv>
          <CounterDiv
            referenceElement={stats.totalProductsSoldToday}
            comparedElement={stats.totalProductsLastWeekday}
            widthMeasured={width}
          />
        </StyledBarCtnDiv>

        <StyledBarCtnDiv lastWeek>
          <CounterDiv
            referenceElement={stats.totalProductsLastWeekday}
            comparedElement={stats.totalProductsSoldToday}
            widthMeasured={width}
          />
        </StyledBarCtnDiv>
        <StyledH2>Customers </StyledH2>
        <StyledBarCtnDiv>
          <CounterDiv
            referenceElement={cartsState.totalCarts}
            comparedElement={cartsState.tempTotalCarts}
            widthMeasured={width}
          />
        </StyledBarCtnDiv>

        <StyledBarCtnDiv lastWeek>
          <CounterDiv
            referenceElement={cartsState.tempTotalCarts}
            comparedElement={cartsState.totalCarts}
            widthMeasured={width}
          />
        </StyledBarCtnDiv>

        <StyledH2>Revenue </StyledH2>
        <StyledBarCtnDiv labelBefore={'€'}>
          <CounterDiv
            referenceElement={stats.totalRevenueToday}
            comparedElement={stats.totalRevenueLastWeekday}
            widthMeasured={width}
          />
        </StyledBarCtnDiv>

        <StyledBarCtnDiv lastWeek labelBefore={'€'}>
          <CounterDiv
            referenceElement={stats.totalRevenueLastWeekday}
            comparedElement={stats.totalRevenueToday}
            widthMeasured={width}
          />
        </StyledBarCtnDiv>
      </StatsCtnDiv>
    </main>
  );
};

export default Today;
