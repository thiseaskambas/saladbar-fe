import React from 'react';
import ReactDOM from 'react-dom';
import { ModalBackgroundDiv, ModalCenteredDiv } from './styles/modal.styled';

interface Props {
  children: React.ReactNode;
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
        <div>
          {children}
          <div>
            <button onClick={onClose}>close</button>
          </div>
        </div>
      </ModalCenteredDiv>
    </>,
    portal
  );
};

export default Modal;
