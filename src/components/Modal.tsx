import React from 'react';
import ReactDOM from 'react-dom';
import {
  ModalBackgroundDiv,
  ModalCenteredDiv,
  StyledCloseBtn,
} from './styles/modal.styles';

interface Props {
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const Modal = ({ children, open, onClose }: Props) => {
  const portal = document.getElementById('portal');
  if (!open || !portal) return null;
  return ReactDOM.createPortal(
    <>
      <ModalBackgroundDiv onClick={onClose} />
      <ModalCenteredDiv>
        <StyledCloseBtn onClick={onClose}>&#10005;</StyledCloseBtn>
        <div>{children}</div>
      </ModalCenteredDiv>
    </>,
    portal
  );
};

export default Modal;
