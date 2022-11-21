import styled from 'styled-components';

export const StyledCardDiv = styled.div`
  border-radius: 1rem;
  /* width: fit-content; */
  height: 30%;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  white-space: nowrap;
  padding: 1rem;
`;

export const StyledImgCtn = styled.div`
  min-width: 100%;
  max-width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  & img {
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%;
  }
`;
