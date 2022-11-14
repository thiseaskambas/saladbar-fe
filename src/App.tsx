import AppRouter from './AppRouter';
import NavBar from './layouts/NavBar';
import Footer from './layouts/Footer';
import GlobalStyles from './layouts/styles/global.styles';
import { useSelector } from 'react-redux';
import { RootState /* useAppDispatch */ } from './store/store';
import { useEffect } from 'react';
// import { findUserFromStoredLoginResponse } from './store/auth.slice';

function App() {
  // const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const userStatus = useSelector((state: RootState) => state.auth.status);

  useEffect(() => {
    if (userStatus === 'idle') {
      // dispatch(findUserFromStoredLoginResponse());
    }
  }, []);

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
