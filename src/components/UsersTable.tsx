import MediaQuery from 'react-responsive';
import { IUser } from '../types/user.types';
import {
  StyledSharedTable,
  StyledSharedTd,
  StyledSharedTr,
} from '../pages/styles/shared.styles';
import { UserTableCellRole } from './UserTableCellRole';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const UsersTable = ({ users }: { users: IUser[] }) => {
  const loggedUserId = useSelector((state: RootState) => state.auth?.user?.id);

  // Sort the users array so that the logged user is displayed first
  const sortedUsers = [...users].sort((a, b) => {
    if (a.id === loggedUserId) {
      return -1;
    } else if (b.id === loggedUserId) {
      return 1;
    } else {
      return 0;
    }
  });
  return (
    <StyledSharedTable>
      <thead>
        <tr>
          <th>Username</th>
          <MediaQuery minWidth={999}>
            <th>Full name</th>
            <th>email</th>
          </MediaQuery>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((usr) => (
          <StyledSharedTr
            key={usr.id}
            clickable={false}
            className={usr.id === loggedUserId ? 'loggedUser' : ''}
          >
            <StyledSharedTd>{usr.username}</StyledSharedTd>
            <MediaQuery minWidth={999}>
              <StyledSharedTd>{usr?.fullName}</StyledSharedTd>
              <StyledSharedTd>{usr.email}</StyledSharedTd>
            </MediaQuery>
            {usr.id !== loggedUserId ? (
              <UserTableCellRole user={usr} />
            ) : (
              <StyledSharedTd style={{ textAlign: 'center' }}>
                {usr.role}
              </StyledSharedTd>
            )}
          </StyledSharedTr>
        ))}
      </tbody>
    </StyledSharedTable>
  );
};
