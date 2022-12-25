import styled from 'styled-components';

export const StyledProductMain = styled.main`
  background-color: ${(props) => props.theme.colors.lightGray};
  display: grid;
  place-items: center;
`;

export const StyledPhotoContainer = styled.div`
  max-width: 200px;
  margin: 0 auto;
  & img {
    width: 100%;
  }
`;
