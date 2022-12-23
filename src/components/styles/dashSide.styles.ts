import styled from 'styled-components';

export const StyledDashSideBar = styled.nav<{ show?: boolean }>`
  background-color: ${({ theme }) => theme.neobrutalColors.PURPLE};
  border-right: 2px solid ${({ theme }) => theme.neobrutalColors.DARKGRAY};
  transition: 0.1s ease-in-out;
  transition-property: width, padding, transform;
  padding: 1rem 0;
  width: 100%;

  & .sideItem {
    transition: 0.1s ease-in-out;
    transition-property: width, transform, top;
    transform: translateX(0%);
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
    transform: translateX(-150%);
    top:1rem
  }
  `}
`;

export const StyledSideBarCtn = styled.div`
  display: flex;
  margin-right: 1rem;
  font-family: 'Roboto Slab', monospace;
`;

export const StyledSideLiItem = styled.li<{
  selected: boolean;
}>`
  ${({ selected, theme }) =>
    selected && {
      backgroundColor: theme.neobrutalColors.ORANGE,
    }}
  color:  ${({ theme }) => theme.neobrutalColors.WHITE};

  cursor: pointer;
  padding: 1rem 0.5rem;
  :first-child {
    margin-top: 2rem;
  }
  :hover {
    background-color: ${({ theme }) => theme.neobrutalColors.YELLOW};
  }
  :active {
    background-color: ${({ theme }) => theme.neobrutalColors.RED};
  }
  & h2 {
    font-weight: 500;
  }
`;

export const StyledSideBarHeading = styled.h1`
  margin-top: 1rem;
  padding: 0 1rem 0 0.5rem;
  font-weight: 900;
`;
