import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useMeasure from 'react-use-measure';
import { useSpring, animated } from '@react-spring/web';

import { getCartsForStats, initializeCarts } from '../store/carts.slice';
import { RootState, useAppDispatch } from '../store/store';
import functionHelpers from '../utils/functionHelpers';
import { StyledBarCtnDiv } from './styles/today.styles';

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

  const [ref, { width }] = useMeasure();

  const Counter = ({ n }: { n: number; width?: number }) => {
    const { number } = useSpring({
      from: { number: 0 },
      number: n,
      delay: 200,
      config: { mass: 1, tension: 20, friction: 10 },
    });
    return <animated.span>{number.to((n) => n.toFixed(0))}</animated.span>;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CounterDiv = ({ widthRef, n }: { n?: number; widthRef?: any }) => {
    console.log({ widthRef, n });
    const { number } = useSpring({
      from: { number: 0 },
      number: n,
      delay: 1000,
      config: { mass: 1, tension: 20, friction: 10 },
    });
    const { widthSpr } = useSpring({
      from: { widthSpr: 0 },
      widthSpr: widthRef,
      delay: 1000,
      config: { mass: 1, tension: 20, friction: 10 },
    });

    return (
      <animated.div className={'fill'} style={{ width: widthSpr }}>
        <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
      </animated.div>
    );
  };

  return (
    <main>
      <div>Hello {userState.user.username} !</div>
      <div>
        Today <Counter n={totalProductsSoldToday} /> products were sold to{' '}
        <Counter n={cartsState.totalCarts} /> customer
        {cartsState.totalCarts > 1 && 's'}. Total revenue is €
        <Counter n={totalRevenueToday} />
      </div>
      <StyledBarCtnDiv ref={ref}>
        <CounterDiv n={totalRevenueToday} widthRef={width} />
      </StyledBarCtnDiv>
      <div>
        On last {weekday}, <Counter n={totalProductsLastWeekday} /> products
        were sold to <Counter n={cartsState.tempTotalCarts} /> customer
        {cartsState.tempTotalCarts > 1 && 's'}. Total revenue was €
        <Counter n={totalRevenueLastWeekday} />
      </div>
    </main>
  );
};

export default Today;
