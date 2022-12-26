import { useSelector } from 'react-redux';
import Notification from '../components/Notification';
import { RootState } from '../store/store';
import { StyledSharedMain } from './styles/shared.styles';

const Home = () => {
  const usersState = useSelector((state: RootState) => state.users);
  const notification = useSelector((state: RootState) => state.notification);
  return (
    <StyledSharedMain>
      <Notification notification={notification} />
    </StyledSharedMain>
  );
};

export default Home;
