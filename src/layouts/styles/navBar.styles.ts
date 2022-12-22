import styled from 'styled-components';

export const StyledMainUl = styled.ul`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: center;
  flex-grow: 1;
`;

export const StyledDropUl = styled.ul<{
  dropdown: boolean;
  depthLevel: number;
  moveLeft?: boolean;
}>`
  display: none;
  min-width: fit-content;
  white-space: nowrap;
  position: absolute;

  & button {
    border-radius: 0;
  }
  ${({ dropdown, theme }) =>
    dropdown && {
      display: 'block',
      backgroundColor: theme.neobrutalColors.WHITE,
    }}
  ${({ depthLevel, moveLeft }) =>
    depthLevel > 1 &&
    !moveLeft && {
      left: '100%',
      top: '50%',
    }}
    
    ${({ depthLevel, moveLeft }) =>
    depthLevel > 1 &&
    moveLeft && {
      right: '100%',
      top: '50%',
    }}
    & li {
    display: flex;
  }
`;

export const StyledNav = styled.nav`
  position: sticky;
  top: 0;
  padding: ${({ theme }) => theme.styledNav.padding};
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.styledNav.backgroundColor};
  border-bottom: 2px solid black;
`;

export const StyledLogoContainer = styled.div`
  height: 50px;
  min-width: 50px;
  max-width: 50px;
  margin-right: 2rem;
  & img {
    width: 100%;
  }
`;
