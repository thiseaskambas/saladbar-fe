import React from 'react';
import ReactDOM from 'react-dom';
import {
  StyledModalBackgroundDiv,
  StyledModalCenteredDiv,
  StyledCloseBtn,
  StyledModalHeader,
} from './styles/modal.styles';

interface Props {
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
  modalTitle?: string;
}

const Modal = ({ children, open, onClose, modalTitle }: Props) => {
  const portal = document.getElementById('portal');
  if (!open || !portal) return null;
  return ReactDOM.createPortal(
    <>
      <StyledModalBackgroundDiv onClick={onClose} />
      <StyledModalCenteredDiv>
        <StyledModalHeader>
          <StyledCloseBtn onClick={onClose}>&#10005;</StyledCloseBtn>
          <h1>{modalTitle}</h1>
        </StyledModalHeader>
        <div>{children}</div>
      </StyledModalCenteredDiv>
    </>,
    portal
  );
};

export default Modal;
