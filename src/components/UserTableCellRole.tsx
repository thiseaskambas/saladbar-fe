import React, { useState } from 'react';
import { IUser } from '../types/user.types';
import {
  StyledSharedBtn,
  StyledSharedSelect,
  StyledSharedTd,
} from '../pages/styles/shared.styles';
import { useAppDispatch } from '../store/store';
import { updateOneUser } from '../store/users.slice';
import {
  setAsyncNotification,
  setNotification,
} from '../store/notification.slice';

export const UserTableCellRole = ({ user }: { user: IUser }) => {
  const dispatch = useAppDispatch();
  const [isRoleChanged, setIsRoleChanged] = useState(false);
  const [isRole, setIsRole] = useState('');
  const changeRoleHandler = (
    e: React.FormEvent<HTMLSelectElement>,
    role: IUser['role']
  ) => {
    e.preventDefault();
    const inputRole = e.currentTarget.value;
    if (inputRole !== role) {
      setIsRoleChanged(() => true);
      setIsRole(inputRole);
    } else {
      setIsRoleChanged(() => false);
      setIsRole('');
    }
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(setNotification({ type: 'loading', text: 'Updating...' }));
    try {
      await dispatch(updateOneUser({ id: user.id, role: isRole }));
      setIsRoleChanged(() => false);
      setIsRole('');
      dispatch(
        setAsyncNotification({
          type: 'success',
          text: 'Successfully updated!',
          time: 5,
        })
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      dispatch(
        setAsyncNotification({
          type: 'error',
          text: err?.message,
          time: 6,
        })
      );
    }
  };
  return (
    <StyledSharedTd>
      <form onSubmit={submitHandler}>
        <StyledSharedSelect
          isDisplayed={true}
          defaultValue={user.role}
          bgColor
          onChange={(event: React.FormEvent<HTMLSelectElement>) =>
            changeRoleHandler(event, user.role)
          }
        >
          <option value="admin">admin</option>
          <option value="user">user</option>
          <option value="dev">dev</option>
        </StyledSharedSelect>
        <StyledSharedBtn isDisplayed={isRoleChanged} type="submit">
          Save
        </StyledSharedBtn>
      </form>
    </StyledSharedTd>
  );
};
