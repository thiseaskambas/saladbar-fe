import React from 'react';
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
  const loggedUserId = useSelector((state: RootState) => state.auth.user.id);
  return (
    <StyledSharedTable>
      <thead>
        <tr>
          <th>Username</th>
          <th>Full name</th>
          <th>email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((usr) => (
          <StyledSharedTr key={usr.id} clickable={false}>
            <StyledSharedTd>{usr.username}</StyledSharedTd>
            <StyledSharedTd>{usr?.fullName}</StyledSharedTd>
            <StyledSharedTd>{usr.email}</StyledSharedTd>
            {usr.id !== loggedUserId ? (
              <UserTableCellRole user={usr} />
            ) : (
              <StyledSharedTd>{usr.role}</StyledSharedTd>
            )}
          </StyledSharedTr>
        ))}
      </tbody>
    </StyledSharedTable>
  );
};
