import styled from 'styled-components';

export const StyledArticle = styled.article`
  border: ${({ theme }) => theme.borders.standard};
  padding: 0;
  background-color: ${({ theme }) => theme.neobrutalColors.WHITE};
  box-shadow: ${({ theme }) =>
    theme.createShadow(10, 10, 0, 0, theme.neobrutalColors.DARKGRAY)};
  & h2 {
    padding: 1rem;
    background-color: ${({ theme }) => theme.neobrutalColors.PURPLE};
    font-weight: 700;
    font-size: 1.2rem;
  }

  & section {
    padding: 1rem;
  }

  & footer {
    background-color: ${({ theme }) => theme.neobrutalColors.PURPLE};
    padding: 0.5rem;
    ::before {
      content: '~';
    }
    text-align: end;
    font-style: italic;
  }
`;

export const StyledInfoMain = styled.main`
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

export const StyledInfoCtnDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 600px;

  & .new-msg {
    align-self: flex-end;
  }
`;
