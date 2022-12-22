import styled from 'styled-components';

export const StyledNavButton = styled.button`
  border-radius: ${({ theme }) => theme.navLink.borderRadius};
  padding: ${({ theme }) => theme.navLink.padding};
  font-weight: ${({ theme }) => theme.navLink.fontWeight};
  display: flex;
  align-items: center;
`;
