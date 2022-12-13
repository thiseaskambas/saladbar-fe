import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { initializeUsers } from '../store/users.slice';
import { UsersTable } from '../components/UsersTable';
import { StyledSharedMain } from './styles/shared.styles';

const Users = () => {
  const dispatch = useAppDispatch();
  const usersState = useSelector((state: RootState) => state.users);

  useEffect(() => {
    let isMounted = true;
    const initData = async () => {
      try {
        await dispatch(initializeUsers()).unwrap();
      } catch (err) {
        console.log(err);
      }
    };
    if (isMounted && usersState.status === 'idle') {
      initData();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <StyledSharedMain>
      {usersState.status === 'succeeded' && (
        <UsersTable users={usersState.users} />
      )}
    </StyledSharedMain>
  );
};

export default Users;
