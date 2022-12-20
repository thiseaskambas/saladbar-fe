import styled from 'styled-components';

export const StyledCartMain = styled.main`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;
export const StytledGridCtn = styled.ul`
  /* background-color: ${({ theme }) => theme.colors.skyBlue}; */
  border-radius: 1rem;
  text-align: center;
  display: grid;
  grid-template-columns: auto auto auto auto;
  row-gap: 1rem;
  grid-template-rows: auto;
  overflow: hidden;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  -webkit-box-shadow: ${({ theme }) => theme.backDropShadow.webkitboxShadow};
  -moz-box-shadow: ${({ theme }) => theme.backDropShadow.mozzilaboxShadow};
  box-shadow: ${({ theme }) => theme.backDropShadow.boxShadow};
  height: fit-content;
  margin-top: 3rem;
  background-color: ${({ theme }) => theme.colors.white};
  & li:nth-child(-n + 4) {
    background-color: ${({ theme }) => theme.colors.blue};
    padding: 0.5rem 1rem;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const StytledGridItem = styled.div`
  padding: 0.5rem 1rem;
`;
export const StytledGridFooterItem = styled.div`
  padding: 0.5rem 1rem;
  grid-column: 1 / span 4;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  text-align: end;
  & :last-child {
    font-weight: bold;
  }
`;

export const StytledName = styled.div``;

export const StyledCardQButton = styled.button`
  background-color: ${({ theme }) => theme.colors.skyBlue};
  padding: 0.2rem 1rem;
  margin: 0 0.4rem;
`;

export const StyledConfirmBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  width: fit-content;
  margin-left: auto;
  display: block;
  margin-right: auto;
  margin-top: 3rem;
  padding: 1rem 2rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.skyBlue};
  -webkit-box-shadow: ${({ theme }) => theme.backDropShadow.webkitboxShadow};
  -moz-box-shadow: ${({ theme }) => theme.backDropShadow.mozzilaboxShadow};
  box-shadow: ${({ theme }) => theme.backDropShadow.boxShadow};
`;
