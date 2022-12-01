import styled from 'styled-components';

export const ModalBackgroundDiv = styled.div`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 10;
`;

export const ModalCenteredDiv = styled.div`
  background-color: lightgreen;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  border-radius: 1rem;
  padding: 1rem;
  width: fit-content;
  height: fit-content;
`;
