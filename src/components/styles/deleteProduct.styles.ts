import styled from 'styled-components';

export const StyledCtnDiv = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  top: -1rem;
  border-radius: 1rem;
  padding: 1rem;
  & .productname {
    font-weight: 800;
  }
`;
