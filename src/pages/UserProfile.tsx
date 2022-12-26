import UserForm from '../components/UserForm';
import { StyledMain } from './styles/form.styles';

const UserProfile = () => {
  return (
    <StyledMain>
      <h1>You can edit your profile here</h1>
      <UserForm />
    </StyledMain>
  );
};

export default UserProfile;
