import styled from 'styled-components';

export const StyledSharedMain = styled.main`
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

export const StyledSharedTable = styled.table`
  background-color: ${({ theme }) => theme.colors.white};
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
`;

export const StyledSharedTr = styled.tr`
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

export const StyledSharedTd = styled.td`
  padding: 0 1rem;
  & .italic {
    font-style: italic;
  }
`;
export const StyledSharedPriceTd = styled.td`
  text-align: end;
  padding: 0 1rem;
`;
