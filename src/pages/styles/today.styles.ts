import styled from 'styled-components';

export const StyledMain = styled.main``;

export const StatsCtnDiv = styled.div`
  width: 80%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

export const StyledH1 = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin: 1rem 0 2rem 0;
  font-weight: 800;
  & .today {
    color: ${({ theme }) => theme.colors.blue};
  }
  & .vs {
    color: ${({ theme }) => theme.colors.orange};
  }
  & .last {
    color: ${({ theme }) => theme.colors.skyBlue};
  }
`;

export const StyledH2 = styled.h2`
  font-size: 2rem;
`;

export const StyledBarCtnDiv = styled.div<{
  labelBefore?: string;
  lastWeek?: boolean;
}>`
  display: flex;
  font-size: 3rem;
  line-height: 4rem;

  color: ${({ theme, lastWeek }) =>
    lastWeek ? theme.colors.white : theme.colors.orange};

  & ::before {
    content: '${({ labelBefore }) => labelBefore}';
  }

  & .fill {
    padding: 1rem 0;
    display: flex;
    background-color: ${({ theme, lastWeek }) =>
      lastWeek ? theme.colors.skyBlue : theme.colors.blue};
    & ::before {
      content: none;
    }
  }
`;
