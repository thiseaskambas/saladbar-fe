import styled from 'styled-components';

export const StyledForm = styled.form`
  /* border: 5px solid; */
  border-radius: 1rem;
  width: fit-content;
  max-width: 400px;
  min-width: min-content;
  padding: 2rem;
  margin-left: auto;
  margin-right: auto;
  background-color: ${(props) => props.theme.colors.white};
`;

export const StyledInnerDiv = styled.div`
  margin-top: 1.5rem;
  > * {
    display: block;
  }
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
  color: red;
  max-width: 100%;
  font-style: italic;
  font-size: 0.9rem;
  word-wrap: break-word;
  /* white-space: initial; */
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
