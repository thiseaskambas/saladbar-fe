import styled from 'styled-components';

export const StyledNavButton = styled.button`
  border-radius: ${({ theme }) => theme.navLink.borderRadius};
  padding: 0.5rem 1rem;
  font-weight: ${({ theme }) => theme.navLink.fontWeight};
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${({ theme }) => theme.navLinkBgColor.hover};
    color: ${({ theme }) => theme.neobrutalColors.WHITE};
    & img {
      filter: invert(100%);
    }
  }
  &:active {
    transform: scale(100%);
    filter: brightness(100%);
  }
`;
