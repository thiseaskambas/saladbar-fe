import styled from 'styled-components';

export const StyledDeleteSymbolBtn = styled.button`
  color: darkgray;
  font-size: 2rem;
  padding: 0 0;
  transition: all ease-in-out 200ms;
  :hover {
    color: ${({ theme }) => theme.neobrutalColors.DARKGRAY};
    transform: scale(1.3);
  }
`;

export const StyledEditBtn = styled.button`
  font-size: 2rem;
  padding: 0 0;
  transition: all 200ms;
  :hover {
    transform: rotate(70deg);
  }
`;
