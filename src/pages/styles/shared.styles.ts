import styled from 'styled-components';

export const StyledSharedMain = styled.main`
  padding-top: 2rem;
  background-color: ${({ theme }) => theme.neobrutalColors.MINT};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const StyledSharedTable = styled.table`
  background-color: ${({ theme }) => theme.neobrutalColors.WHITE};
  margin-left: auto;
  margin-right: auto;
  padding: 2rem;
  border: ${({ theme }) => theme.borders.standard};
  box-shadow: ${({ theme }) =>
    theme.createShadow(10, 10, 0, 0, theme.neobrutalColors.DARKGRAY)};
`;

export const StyledSharedTr = styled.tr<{
  clickable?: boolean;
}>`
  transition: all 200ms;
  line-height: 1.2rem;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};

  :nth-child(odd) {
    background-color: ${({ theme }) => theme.paleBrutalColors.ORANGE};
  }

  &.loggedUser {
    background-color: ${({ theme }) => theme.paleBrutalColors.PURPLE};
  }

  ${({ clickable, theme }) => {
    if (clickable)
      return `
    :hover {
      background-color: ${theme.neobrutalColors.ORANGE};
    }
    `;
  }}
`;

export const StyledSharedTd = styled.td`
  padding: 0.5rem 1rem;

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
  bgColor?: boolean;
}>`
  display: ${({ isDisplayed }) => (isDisplayed ? 'inline-block' : 'none')};
  background-color: ${({ theme, bgColor }) =>
    bgColor ? theme.neobrutalColors.PURPLE : theme.neobrutalColors.WHITE};
  color: ${({ bgColor }) => (bgColor ? 'black' : 'white')};
  border: ${({ theme }) => theme.borders.medium};
  border-radius: 0.25rem;
  padding: 0.3rem 0.5rem;
  margin: 0 1rem;
  cursor: pointer;
  outline: none;
  :focus {
    border: 2px solid ${({ theme }) => theme.neobrutalColors.GREEN};
  }
`;

export const StyledSharedBtn = styled.button<{ isDisplayed: boolean }>`
  display: ${({ isDisplayed }) => (isDisplayed ? 'inline-block' : 'none')};
  background-color: ${({ theme }) => theme.neobrutalColors.GREEN};
  color: white;
  padding: ${({ theme }) => theme.paddings.standard};
  border-radius: 0.25rem;
`;
