import styled from 'styled-components';

export const StyledSharedMain = styled.main`
  padding-top: 2rem;
  background-color: ${({ theme }) => theme.colors.lightGray};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const StyledSharedTable = styled.table`
  background-color: ${({ theme }) => theme.colors.white};
  margin-left: auto;
  margin-right: auto;
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
