import styled from 'styled-components';

export const StyledDashSideBar = styled.nav<{ show?: boolean }>`
  background-color: ${({ theme }) => theme.colors.lightBrown};
  transition: 0.1s ease-out;
  transition-property: width, padding;
  padding: 1rem;
  width: 100%;

  & .sideItem {
    transition: 0.1s ease-out;
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
    width: 0%;
    transform: translateX(-150%);
    top: 1rem
  }
  `}
`;

export const StyledSideBarCtn = styled.div<{
  show?: boolean;
}>`
  display: flex;
  margin-right: 1rem;
`;

export const StyledSideLiItem = styled.li<{
  selected: boolean;
}>`
  ${({ selected, theme }) =>
    selected && {
      backgroundColor: theme.colors.darkBrown,
    }}
  cursor: pointer;
  padding: 1rem 0.5rem;
  :first-child {
    margin-top: 1rem;
  }
  :hover {
    background-color: ${({ theme }) => theme.colors.mediumBrown};
  }
  :active {
    background-color: ${({ theme }) => theme.colors.darkBrown};
  }
`;
