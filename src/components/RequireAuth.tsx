import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store/store';

const RequireAuth = () => {
  const location = useLocation();
  const userStatus = useSelector((state: RootState) => state.auth.status);

  return userStatus === 'succeeded' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
