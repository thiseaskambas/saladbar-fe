import styled from 'styled-components';

export const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.colors.mediumBrown};
  min-height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;
