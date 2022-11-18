import styled from 'styled-components';

export const StyledForm = styled.form`
  border-radius: 1rem;
  max-width: 380px;
  padding: 1rem 3rem;
  margin-left: auto;
  margin-right: auto;
  background-color: ${(props) => props.theme.colors.white};
  & a {
    text-decoration: underline;
  }
`;

export const StyledInnerDiv = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  & button {
    margin-left: auto;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-weight: 300;
    background-color: ${(props) => props.theme.colors.white};
    :enabled {
      background-color: ${(props) => props.theme.colors.blue};
      color: white;
    }
    :disabled {
      cursor: not-allowed;
      background-color: white;
      font-weight: 100;
    }
  }

  & label {
    font-weight: 200;
  }
`;

export const StyledMessageCtn = styled.div`
  color: ${(props) => props.theme.error.color};
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  flex: 1 1 auto;
  word-wrap: break-word;
  font-size: 0.9rem;
  text-align: end;
`;

export const StyledMain = styled.main`
  background-color: ${(props) => props.theme.colors.lightBlue};
  display: grid;
  place-items: center;
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
