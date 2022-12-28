import styled from 'styled-components';

export const StyledProductMain = styled.main`
  background-color: ${(props) => props.theme.colors.lightGray};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledPhotoContainer = styled.div`
  max-width: 200px;
  margin: 0 auto;
  & img {
    width: 100%;
  }
`;
