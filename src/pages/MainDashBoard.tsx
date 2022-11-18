import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import DashSideBar from '../components/DashSideBar';
import { StyledDashContent } from '../components/styles/dashSide.styled';

import { initializeProducts } from '../store/products.slice';
import { RootState, useAppDispatch } from '../store/store';
import { StyledMainDash } from './styles/mainDash.styles';

const MainDashBoard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const productsState = useSelector((state: RootState) => state.products);
  const [isSideBarDisp, setSideBarDisp] = useState(true);
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

    if (productsState.status === 'idle' && isMounted) {
      console.log('initializing');
      initProducts();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  console.log(productsState.products);

  return (
    <>
      <StyledMainDash>
        <DashSideBar
          display={isSideBarDisp}
          products={productsState.products}
        />
        <StyledDashContent>
          <div>
            <button onClick={() => setSideBarDisp(!isSideBarDisp)}>
              {isSideBarDisp ? 'hide' : 'show'}
            </button>
          </div>
          MainDashBoard
        </StyledDashContent>
      </StyledMainDash>
    </>
  );
};

export default MainDashBoard;
