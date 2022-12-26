import { StyledLogoutCtn } from './styles/logoutPrompt.styled';
import {
  StyledBtnCtnDiv,
  StyledCancelBtn,
  StyledConfirmBtn,
  StyledModalCtnDiv,
} from './styles/modal.styles';

interface IProps {
  onCancel: () => void;
  onLogout: () => void;
}

const LogoutPrompt = ({ onCancel, onLogout }: IProps) => {
  return (
    <StyledModalCtnDiv>
      <StyledLogoutCtn>
        <div>
          Are you sure you want to <b>Logout ?</b>
        </div>
      </StyledLogoutCtn>
      <StyledBtnCtnDiv>
        <StyledConfirmBtn onClick={onLogout}>Yes</StyledConfirmBtn>
        <StyledCancelBtn onClick={onCancel}>No</StyledCancelBtn>
      </StyledBtnCtnDiv>
    </StyledModalCtnDiv>
  );
};

export default LogoutPrompt;
