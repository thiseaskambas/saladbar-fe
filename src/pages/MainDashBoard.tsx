import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { refreshToken } from '../store/auth.slice';
import { initializeProducts } from '../store/products.slice';
import { RootState, useAppDispatch } from '../store/store';

const MainDashBoard = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeProducts());
  }, []);
  const productsState = useSelector((state: RootState) => state.products);
  console.log(productsState);

  return (
    <main>
      <div>MainDashBoard</div>
      <button onClick={() => dispatch(refreshToken())}>Refresh</button>
    </main>
  );
};

export default MainDashBoard;
