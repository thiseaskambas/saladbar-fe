import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CartsTable from '../components/CartsTable';
import { initializeCarts } from '../store/carts.slice';
import { RootState, useAppDispatch } from '../store/store';
import { StyledSharedMain } from './styles/shared.styles';

const CartsDash = () => {
  const dispatch = useAppDispatch();
  const cartsState = useSelector((state: RootState) => state.carts);
  useEffect(() => {
    let isMounted = true;
    const initCarts = async () => {
      try {
        await dispatch(initializeCarts()).unwrap();
      } catch (err) {
        console.log(err);
      }
    };

    if (isMounted && cartsState.status === 'idle') {
      initCarts();
    }

    return () => {
      isMounted = false;
    };
  }, []);
  console.log(cartsState.carts);

  return (
    <StyledSharedMain>
      {cartsState.status === 'succeeded' && (
        <CartsTable carts={cartsState.carts} />
      )}
    </StyledSharedMain>
  );
};

export default CartsDash;
