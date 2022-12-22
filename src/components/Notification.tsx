import { INotification } from '../types/notification.types';
import { StyledNotifContainerDiv } from './styles/notification.styles';

interface IProps {
  notification: INotification;
}

const Notification = ({ notification }: IProps) => {
  if (notification.type === 'none') return null;
  return (
    <StyledNotifContainerDiv type={notification.type}>
      {notification.type === 'error' && 'Error : '} {notification.text}
    </StyledNotifContainerDiv>
  );
};

export default Notification;
