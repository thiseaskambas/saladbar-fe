import React from 'react';
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
      <div>
        Are you sure you want to <b>Logout ?</b>
      </div>
      <StyledBtnCtnDiv>
        <StyledConfirmBtn onClick={onLogout}>Yes</StyledConfirmBtn>
        <StyledCancelBtn onClick={onCancel}>No</StyledCancelBtn>
      </StyledBtnCtnDiv>
    </StyledModalCtnDiv>
  );
};

export default LogoutPrompt;
