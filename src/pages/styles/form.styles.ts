import styled from 'styled-components';

export const StyledForm = styled.form`
  max-width: 380px;
  padding: 1rem 3rem;
  margin: 2rem;

  border: ${({ theme }) => theme.borders.standard};
  background-color: ${({ theme }) => theme.neobrutalColors.WHITE};
  box-shadow: ${({ theme }) =>
    theme.createShadow(10, 10, 0, 0, theme.neobrutalColors.DARKGRAY)};
  & a {
    text-decoration: underline;
  }
  & .email-noedit {
    padding: 0.2rem;
    background-color: ${({ theme }) => theme.neobrutalColors.WHITE};
    font-weight: 200;
  }
`;

export const StyledInnerDiv = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  & label {
    font-weight: 200;
  }
`;

export const StyledMessageCtn = styled.div`
  color: ${(props) => props.theme.colors.gray};
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  flex: 1 1 auto;
  word-wrap: break-word;
  font-size: 0.9rem;
  text-align: end;
`;

export const StyledMain = styled.main`
  background-color: ${({ theme }) => theme.paleBrutalColors.ORANGE};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 3rem;
  gap: 3rem;
  & h1 {
    border: ${({ theme }) => theme.borders.standard};
    padding: ${({ theme }) => theme.paddings.standard};
    background-color: ${({ theme }) => theme.neobrutalColors.WHITE};
    font-size: 1.5rem;
  }
`;

export const StyledImgCtn = styled.div`
  height: 70px;
  min-width: 70px;
  max-width: 70px;
  margin-left: auto;
  margin-right: auto;
  & img {
    width: 100%;
  }
`;
