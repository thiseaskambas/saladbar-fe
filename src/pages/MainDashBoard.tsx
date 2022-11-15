import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logUserOut, refreshToken } from '../store/auth.slice';
import { initializeProducts } from '../store/products.slice';
import { RootState, useAppDispatch } from '../store/store';

const MainDashBoard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const productsState = useSelector((state: RootState) => state.products);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    if (productsState.status !== 'succeeded' && isMounted) {
      initProducts();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <main>
        <div>MainDashBoard</div>
        <button onClick={() => dispatch(logUserOut())}>Logout</button>
      </main>
    </>
  );
};

export default MainDashBoard;
