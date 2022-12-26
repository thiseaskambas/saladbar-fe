import styled from 'styled-components';
import { INotification } from '../../types/notification.types';

export const StyledNotifContainerDiv = styled.div<{
  type: INotification['type'];
}>`
  background-color: ${({ type, theme }) => {
    switch (type) {
      case 'loading':
        return theme.neobrutalColors.MINT;
      case 'success':
        return theme.neobrutalColors.PURPLE;
      case 'error':
        return theme.neobrutalColors.ORANGE;
      default:
        return 'transparent';
    }
  }};

  padding: 1rem;
  border: ${({ theme }) => theme.borders.standard};
  margin: 0.5rem 1rem;
  text-align: center;
`;
