import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store/store';
import { IRole } from '../types/user.types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RequireAuth = ({ allowedRoles }: { allowedRoles?: IRole[] }) => {
  const location = useLocation();
  const userState = useSelector((state: RootState) => state.auth);

  return allowedRoles?.includes(userState.user.role) ? (
    <Outlet />
  ) : userState.status === 'succeeded' ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
