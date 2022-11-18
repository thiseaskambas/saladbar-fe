import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { initializeProducts } from '../store/products.slice';
import { RootState, useAppDispatch } from '../store/store';

const MainDashBoard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const productsState = useSelector((state: RootState) => state.products);

  useEffect(() => {
    let isMounted = true;

    const initProducts = async () => {
      try {
        await dispatch(initializeProducts()).unwrap();
      } catch (err) {
        console.log(err);
        //TODO: NOTIFICATION
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    if (productsState.status !== 'idle' && isMounted) {
      initProducts();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  console.log(productsState.products);

  return (
    <>
      <main>
        <div>MainDashBoard</div>
      </main>
    </>
  );
};

export default MainDashBoard;
