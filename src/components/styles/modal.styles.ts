import styled from 'styled-components';

export const StyledModalBackgroundDiv = styled.div`
  background: rgb(0, 0, 0); //fallbacks
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
  min-width: 300px;
`;

export const StyledModalCtnDiv = styled.div`
  background-color: ${({ theme }) => theme.neobrutalColors.WHITE};
  z-index: 10;
  & b {
    font-weight: 800;
  }
`;

export const StyledModalHeader = styled.div`
  background-color: ${({ theme }) => theme.neobrutalColors.PURPLE};
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & h1 {
    font-weight: 800;
    margin: auto;
    position: relative;
    left: -1rem;
  }
`;

export const StyledCloseBtn = styled.button`
  background-color: ${({ theme }) => theme.neobrutalColors.PURPLE};
  color: white;
  height: 1.5rem;
  width: 1.5rem;
  margin: 0.5rem;
  border: 2px solid white;
`;

export const StyledCancelBtn = styled.button`
  background-color: ${({ theme }) => theme.paleBrutalColors.PURPLE};
  padding: 0.5rem;
  flex-grow: 1;
  justify-content: center;
`;
export const StyledConfirmBtn = styled.button`
  background-color: ${({ theme }) => theme.neobrutalColors.PURPLE};
  padding: 0.5rem;
  flex-grow: 1;
  justify-content: center;
`;

export const StyledBtnCtnDiv = styled.div`
  margin-top: 1rem;
  display: flex;
`;
export const StyledMessageCtnDiv = styled.div`
  padding: 1rem;
`;
