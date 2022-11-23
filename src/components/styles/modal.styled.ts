import styled from 'styled-components';

export const ModalBackgroundDiv = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 1000;
`;

export const ModalCenteredDiv = styled.div`
  background-color: lightgreen;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  border-radius: 1rem;
  padding: 1rem;
  width: 250px;
  height: 170px;
`;
