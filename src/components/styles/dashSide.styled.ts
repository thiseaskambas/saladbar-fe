import styled from 'styled-components';

export const StyledDashSideBar = styled.nav<{ show?: boolean }>`
  background-color: ${({ theme }) => theme.colors.lightBrown};
  transition: 0.4s ease-in-out;
  padding: 1rem;
  width: 100%;

  & .sideItem {
    transition: 0.4s ease-in-out;
    background-color: aqua;
    /* transform: translateX(0%); */
    overflow: hidden;
    position: relative;
    top: 0;
    width: 100%;
  }

  ${({ show }) =>
    !show &&
    `
  width: 0;
   padding: 0;
   > .sideItem {
    width: 0%;
    transform: translateX(-150%);
    top: 1rem
  
  }
  `}
`;

export const StyledDashContent = styled.div`
  padding-top: 1rem;
  overflow: hidden;
`;

export const StyledSideBarCtn = styled.div<{
  show?: boolean;
}>`
  display: flex;
`;
