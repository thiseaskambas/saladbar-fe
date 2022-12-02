import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { refreshToken } from '../store/auth.slice';
import { RootState, useAppDispatch } from '../store/store';

const PersistLogin = () => {
  const dispatch = useAppDispatch();
  const storedToken = useSelector((state: RootState) => state.auth.accessToken);
  const [isLoading, setIsLoading] = useState(true);
  const [persist] = useState(
    JSON.parse(localStorage.getItem('persist') || 'false')
  );
  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await dispatch(refreshToken()).unwrap();
      } catch (err) {
        console.log(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !storedToken && persist ? verifyRefreshToken() : setIsLoading(false);
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <main>loading</main> : <Outlet />}</>
  );
};

export default PersistLogin;
