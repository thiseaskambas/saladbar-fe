import styled from 'styled-components';
import images from '../../assets/';

export const StatsCtnDiv = styled.div`
  width: 80%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

export const StyledCtnDiv = styled.div`
  border: ${({ theme }) => theme.borders.standard};
  background-color: ${({ theme }) => theme.neobrutalColors.WHITE};
  box-shadow: ${({ theme }) =>
    theme.createShadow(10, 10, 0, 0, theme.neobrutalColors.DARKGRAY)};
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3rem;
  padding: 1rem;
`;

export const StyledH1 = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin: 1rem 0 2rem 0;
  font-weight: 700;
  & .today {
    background: url(${images['brush_1_purple.png']});
    background-size: contain;
    background-repeat: no-repeat;
  }

  & .vs {
    font-size: 3rem;
    font-weight: 300;
    position: relative;
    line-height: 3rem;
  }

  & .last {
    background: url(${images['brush_2_orange.png']});
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

export const StyledH2 = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fontFamimies.ROBOTO};
  :not(:first-child) {
    margin-top: 1rem;
  }
`;

export const StyledBarCtnDiv = styled.div<{
  labelBefore?: string;
  lastWeek?: boolean;
}>`
  font-size: 3rem;
  line-height: 3rem;
  color: ${({ theme, lastWeek }) =>
    lastWeek ? theme.neobrutalColors.DARKGRAY : theme.neobrutalColors.DARKGRAY};

  & ::before {
    content: '${({ labelBefore }) => labelBefore}';
  }

  & .fill {
    padding: 0;
    display: flex;

    min-width: fit-content;
    background-color: ${({ theme, lastWeek }) =>
      lastWeek ? theme.neobrutalColors.ORANGE : theme.neobrutalColors.PURPLE};
    & ::before {
      content: none;
    }
  }
`;
