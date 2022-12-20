import AppRouter from './AppRouter';
import NavBar from './layouts/NavBar';
import Footer from './layouts/Footer';
import GlobalStyles from './styleUtils/global.styles';
import { useSelector } from 'react-redux';
import { RootState /* useAppDispatch */, useAppDispatch } from './store/store';
import { useEffect } from 'react';
import { initializeProducts } from './store/products.slice';
import { useLocation, useNavigate } from 'react-router-dom';

function App() {
  const user = useSelector((state: RootState) => state.auth.user);
  const userStatus = useSelector((state: RootState) => state.auth.status);
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
      <NavBar user={userStatus === 'succeeded' ? user : null} />
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;
