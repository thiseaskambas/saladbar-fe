import styled from 'styled-components';

export const StyledPagesUl = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  & .active {
    background-color: ${({ theme }) => theme.neobrutalColors.DARKGRAY};
    color: ${({ theme }) => theme.neobrutalColors.WHITE};
    padding: 0.2rem;
  }

  & button:disabled {
    cursor: default;
  }
`;
