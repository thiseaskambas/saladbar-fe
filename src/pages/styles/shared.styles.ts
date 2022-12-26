import styled from 'styled-components';
import { KeyofNeoBrColors } from '../../styleUtils/theme';
import images from '../../assets';

export const StyledSharedMain = styled.main`
  padding-top: 2rem;
  background-color: ${({ theme }) => theme.neobrutalColors.MINT};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  & h1 {
    border: ${({ theme }) => theme.borders.standard};
    padding: ${({ theme }) => theme.paddings.standard};
    background-color: ${({ theme }) => theme.neobrutalColors.WHITE};
    font-size: 1.5rem;
  }
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
  border: ${({ theme }) => theme.borders.thin};
  border-radius: 0.25rem;
  padding: 0.3rem 0.5rem;
  margin: 0 1rem;
  cursor: pointer;
  outline: none;
  :focus {
    border: 3px solid ${({ theme }) => theme.neobrutalColors.DARKGRAY};
  }
`;

export const StyledSharedBtn = styled.button<{ isDisplayed: boolean }>`
  display: ${({ isDisplayed }) => (isDisplayed ? 'inline-block' : 'none')};
  background-color: ${({ theme }) => theme.neobrutalColors.GREEN};
  color: white;
  padding: ${({ theme }) => theme.paddings.standard};
  border-radius: 0.25rem;
`;

export const StyledSharedColoredBtn = styled.button<{
  bgColor: KeyofNeoBrColors;
  txtColor?: KeyofNeoBrColors;
  borderSquare?: boolean;
}>`
  background-color: ${({ theme, bgColor }) => theme.neobrutalColors[bgColor]};
  color: ${({ theme, txtColor }) =>
    txtColor
      ? theme.neobrutalColors[txtColor]
      : theme.neobrutalColors.DARKGRAY};
  padding: ${({ theme }) => theme.paddings.standard};
  border-radius: ${({ borderSquare }) => (borderSquare ? '0rem' : '0.25rem')};
`;

export const StyledSharedDeleteBtn = styled.button<{
  bgColor?: KeyofNeoBrColors;
  borderSquare?: boolean;
}>`
  border-radius: ${({ borderSquare }) => (borderSquare ? '0rem' : '0.25rem')};
  background: ${({ theme, bgColor }) =>
      bgColor && theme.neobrutalColors[bgColor]}
    url(${images['delete_a.png']});
  background-size: contain;
  background-repeat: no-repeat;
  height: 1.5rem;
  width: 1.5rem;
  transition: all ease-in-out 200ms;
  :hover {
    background: ${({ theme, bgColor }) =>
        bgColor && theme.neobrutalColors[bgColor]}
      url(${images['delete_b.png']});

    background-size: contain;
    background-repeat: no-repeat;
    transform: scale(1.3);
  }
`;
