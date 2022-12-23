import styled from 'styled-components';

export const StyledModalBackgroundDiv = styled.div`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 10;
`;

export const StyledModalCenteredDiv = styled.div`
  background-color: ${({ theme }) => theme.neobrutalColors.WHITE};
  position: fixed;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  border-radius: 1rem;
  width: fit-content;
  height: fit-content;
`;

export const StyledModalCtnDiv = styled.div`
  background-color: ${({ theme }) => theme.neobrutalColors.WHITE};
  border-radius: 0 0 1rem 1rem;
  padding: 0 1rem 1rem 1rem;
  background-color: red;
  z-index: 10;
  & b {
    font-weight: 800;
  }
`;

export const StyledModalHeader = styled.div`
  background-color: ${({ theme }) => theme.neobrutalColors.DARKGRAY};
  border-radius: 1rem 1rem 0 0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  & h1 {
    font-weight: 800;
    margin: auto;
    position: relative;
    left: -1rem;
  }
`;

export const StyledCloseBtn = styled.button`
  background-color: ${({ theme }) => theme.neobrutalColors.ORANGE};
  color: white;
  height: 1.25rem;
  width: 1.25rem;
  margin: 0.5rem;
  border-radius: 50%;
`;

export const StyledCancelBtn = styled.button`
  padding: 0.2rem 1rem;
  background-color: ${({ theme }) => theme.colors.skyBlue};
  color: black;
  border-radius: 0.3rem;
  margin-left: 1rem;
`;
export const StyledConfirmBtn = styled.button`
  padding: 0.2rem 1rem;
  background-color: ${({ theme }) => theme.colors.blue};
  color: white;
  border-radius: 0.3rem;
`;

export const StyledBtnCtnDiv = styled.div`
  margin-top: 1rem;
`;
