import styled from 'styled-components';

export const StyledPagesUl = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;

  & .active {
    color: ${({ theme }) => theme.colors.newBlue};
    text-decoration: underline;
  }

  & button:disabled {
    cursor: default;
  }
`;
