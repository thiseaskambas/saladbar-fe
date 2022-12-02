import styled from 'styled-components';

export const StyledTable = styled.table`
  background-color: ${({ theme }) => theme.colors.white};
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
`;

export const StyledTd = styled.td`
  padding: 0 1rem;
  & .filename {
    font-style: italic;
  }
`;
export const StyledPriceTd = styled.td`
  text-align: end;
`;

export const StyledTr = styled.tr`
  transition: all 200ms;
  line-height: 1.2rem;
  cursor: pointer;

  :nth-child(even) {
    background-color: ${({ theme }) => theme.colors.lightBrown};
  }
  :hover {
    background-color: ${({ theme }) => theme.colors.mediumBrown};
  }
`;

export const StyledDeleteSymbolBtn = styled.button`
  color: darkgray;
  font-size: 2rem;
  padding: 0 0;
  transition: all ease-in-out 200ms;
  :hover {
    color: red;
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
