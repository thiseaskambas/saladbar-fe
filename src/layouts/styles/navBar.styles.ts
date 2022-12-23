import styled from 'styled-components';

export const StyledMainUl = styled.ul`
  display: flex;

  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  flex-grow: 1;
`;

export const StyledDropUl = styled.ul<{
  dropdown: boolean;
  depthLevel: number;
  moveLeft?: boolean;
  moveFromTop?: number;
}>`
  display: none;
  min-width: fit-content;
  white-space: nowrap;
  position: absolute;
  top: ${({ moveFromTop }) => moveFromTop}px;

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
  border-bottom: ${({ theme }) => theme.borders.standard};
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
