import styled from 'styled-components';

export const StyledMainUl = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: center;
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
      backgroundColor: theme.colors.mediumBrown,
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
  top: 0;
  padding: 1rem;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.lightBrown};
  -webkit-box-shadow: 0px 3px 8px 0px rgba(66, 66, 66, 0.64);
  -moz-box-shadow: 0px 3px 8px 0px rgba(66, 66, 66, 0.64);
  box-shadow: 0px 3px 8px 0px rgba(66, 66, 66, 0.64);
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
