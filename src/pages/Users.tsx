import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { initializeUsers } from '../store/users.slice';
import { UsersTable } from '../components/UsersTable';
import { StyledSharedMain } from './styles/shared.styles';
import Notification from '../components/Notification';

const Users = () => {
  const dispatch = useAppDispatch();
  const usersState = useSelector((state: RootState) => state.users);
  const notification = useSelector((state: RootState) => state.notification);

  useEffect(() => {
    let isMounted = true;
    const initData = async () => {
      try {
        await dispatch(initializeUsers()).unwrap();
      } catch (err) {
        console.log(err);
      }
    };
    if (isMounted && usersState.status !== 'loading') {
      initData();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <StyledSharedMain>
      <Notification notification={notification} />
      {usersState.status === 'succeeded' && (
        <UsersTable users={usersState.users} />
      )}
    </StyledSharedMain>
  );
};

export default Users;
