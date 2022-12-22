import styled from 'styled-components';
import { INotification } from '../../types/notification.types';

export const StyledNotifContainerDiv = styled.div<{
  type: INotification['type'];
}>`
  background-color: ${({ type, theme }) => {
    switch (type) {
      case 'loading':
        return theme.colors.lightBlue;
      case 'success':
        return theme.colors.lightGreen;
      case 'error':
        return theme.colors.lightOrange;
      default:
        return 'transparent';
    }
  }};
`;
