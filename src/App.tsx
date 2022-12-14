import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MediaQuery from 'react-responsive';

import AppRouter from './AppRouter';
import NavBar from './layouts/NavBar';
import Footer from './layouts/Footer';
import GlobalStyles from './styleUtils/global.styles';
import { RootState /* useAppDispatch */, useAppDispatch } from './store/store';
import { initializeProducts } from './store/products.slice';
import MobileNavBar from './layouts/MobileNavBar';

function App() {
  const user = useSelector((state: RootState) => state.auth.user);
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const productsState = useSelector((state: RootState) => state.products);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const initProducts = async () => {
      try {
        await dispatch(initializeProducts());
      } catch (err) {
        console.log(err);
        //TODO: NOTIFICATION
        navigate('/login', { state: { from: location }, replace: true });
      }
    };
    if (productsState.status === 'idle' && isMounted && user) {
      initProducts();
    }
    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  return (
    <>
      <GlobalStyles />
      <MediaQuery minWidth={1000}>
        <NavBar user={authStatus === 'succeeded' ? user : null} />
      </MediaQuery>
      <MediaQuery maxWidth={999}>
        <MobileNavBar user={authStatus === 'succeeded' ? user : null} />
      </MediaQuery>
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;
