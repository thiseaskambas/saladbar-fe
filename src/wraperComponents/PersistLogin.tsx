import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { refreshToken } from '../store/auth.slice';
import { RootState, useAppDispatch } from '../store/store';

const PersistLogin = () => {
  const dispatch = useAppDispatch();
  const storedToken = useSelector((state: RootState) => state.auth.accessToken);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await dispatch(refreshToken()).unwrap();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    !storedToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{!isLoading && <Outlet />}</>;
};

export default PersistLogin;
