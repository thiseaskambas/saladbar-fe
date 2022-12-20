import styled from 'styled-components';

export const StyledSharedMain = styled.main`
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
  margin-top: 2rem;
  padding: 2rem;
`;

export const StyledSharedTr = styled.tr<{ clickable?: boolean }>`
  transition: all 200ms;
  line-height: 1.2rem;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};

  :nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.lightBrown};
  }

  ${({ clickable, theme }) => {
    if (clickable)
      return `
    :hover {
      background-color: ${theme.colors.mediumBrown};
    }
    `;
  }}
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

export const StyledSharedSelect = styled.select<{
  isDisplayed: boolean;
  bgColor?: 'white' | 'blue';
}>`
  display: ${({ isDisplayed }) => (isDisplayed ? 'inline-block' : 'none')};
  background-color: ${({ theme, bgColor }) =>
    bgColor === 'white' ? theme.colors.white : theme.colors.newBlue};
  color: ${({ bgColor }) => (bgColor === 'white' ? 'black' : 'white')};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 0.25rem;
  padding: 0.3rem 0.5rem;
  margin: 0 1rem;
  cursor: pointer;
  outline: none;

  :focus {
    border: 1px solid ${({ theme }) => theme.colors.newBlue};
  }
`;

export const StyledSharedBtn = styled.button<{ isDisplayed: boolean }>`
  display: ${({ isDisplayed }) => (isDisplayed ? 'inline-block' : 'none')};
  background-color: ${({ theme }) => theme.colors.newBlue};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
`;
