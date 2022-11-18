import styled from 'styled-components';

export const StyledDashSideBar = styled.nav<{ display: boolean }>`
  display: ${(props) => !props.display && 'none'};
  background-color: ${({ theme }) => theme.colors.lightBrown};
  padding: 1rem;
`;

export const StyledDashContent = styled.div`
  padding-top: 1rem;
`;
