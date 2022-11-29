import styled from 'styled-components';

export const StyledProductForm = styled.form`
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

export const StyledProductMain = styled.main`
  background-color: ${(props) => props.theme.colors.lightGray};
  display: grid;
  place-items: center;
`;
