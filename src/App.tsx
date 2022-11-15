import AppRouter from './AppRouter';
import NavBar from './layouts/NavBar';
import Footer from './layouts/Footer';
import GlobalStyles from './layouts/styles/global.styles';
import { useSelector } from 'react-redux';
import { RootState /* useAppDispatch */ } from './store/store';
// import { useEffect } from 'react';
// import { initializeProducts } from './store/products.slice';
// import { findUserFromStoredLoginResponse } from './store/auth.slice';

function App() {
  // const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const userStatus = useSelector((state: RootState) => state.auth.status);
  // const productsState = useSelector((state: RootState) => state.products);

  // useEffect(() => {
  //   if (userStatus === 'idle') {
  //     dispatch(findUserFromStoredLoginResponse());
  //   }
  // }, []);
  // useEffect(() => {
  //   let subscribed = true;
  //   if (
  //     subscribed &&
  //     userStatus === 'succeeded' &&
  //     productsState.status === 'idle'
  //   ) {
  //     dispatch(initializeProducts());
  //   }
  //   return () => {
  //     subscribed = false;
  //   };
  // }, [userStatus]);

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
