import styled from 'styled-components';

export const StyledMainUl = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
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

  ${({ dropdown }) =>
    dropdown && {
      display: 'block',
      backgroundColor: 'white',
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
`;
