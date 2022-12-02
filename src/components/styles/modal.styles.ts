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
  background-color: ${({ theme }) => theme.colors.lightGray};
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

export const StyledCloseBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.orange};
  display: block;
  color: white;
  height: 1.5rem;
  width: 1.5rem;
  position: relative;
  top: -1.5rem;
  left: -1.5rem;
  border-radius: 50%;
`;

export const StyledCancelBtn = styled.button`
  padding: 0.2rem 1rem;
  background-color: ${({ theme }) => theme.colors.skyBlue};
  color: black;
  border-radius: 0.3rem;
  margin-left: 1rem;
`;
export const StyledDeleteBtn = styled.button`
  padding: 0.2rem 1rem;
  background-color: ${({ theme }) => theme.colors.blue};
  color: white;
  border-radius: 0.3rem;
`;

export const StyledBtnCtnDiv = styled.div`
  margin-top: 1rem;
`;
