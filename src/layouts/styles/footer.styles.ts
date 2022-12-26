import styled from 'styled-components';

export const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.neobrutalColors.PURPLE};
  color: ${({ theme }) => theme.neobrutalColors.WHITE};
  border-top: 3px solid black;
  min-height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;
