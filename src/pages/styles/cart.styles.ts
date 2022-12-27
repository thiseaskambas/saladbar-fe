import styled from 'styled-components';

export const StyledCartMain = styled.main`
  height: 100%;
  background-color: ${({ theme }) => theme.neobrutalColors.MINT};
`;

export const StyledCartNoItems = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  padding: 2rem;
  width: fit-content;
  background-color: ${({ theme }) => theme.neobrutalColors.WHITE};
  box-shadow: ${({ theme }) =>
    theme.createShadow(15, 15, 0, 0, theme.neobrutalColors.DARKGRAY)};
  & h1 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
`;

export const StytledGridCtn = styled.div`
  border-radius: 1rem;
  text-align: center;
  align-items: center;
  display: grid;
  grid-template-columns: auto auto auto auto;
  row-gap: 1rem;
  grid-template-rows: auto;
  overflow: hidden;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  border: 3px solid black;
  box-shadow: ${({ theme }) =>
    theme.createShadow(-15, 15, 0, 0, theme.neobrutalColors.DARKGRAY)};
  height: fit-content;
  margin-top: 3rem;
  background-color: ${({ theme }) => theme.neobrutalColors.WHITE};
  & .title {
    background-color: ${({ theme }) => theme.neobrutalColors.MINT};
    padding: 0.5rem 1rem;
    font-weight: 600;
  }
`;

export const StytledGridItem = styled.div`
  padding: 0.5rem 1rem;
`;
export const StytledGridFooterItem = styled.div`
  padding: 0.5rem 1rem;
  grid-column: 1 / span 4;
  background-color: ${({ theme }) => theme.neobrutalColors.MINT};

  text-align: end;
  & :last-child {
    font-weight: bold;
  }
`;

export const StytledName = styled.div``;

export const StyledCardQButton = styled.button`
  background-color: ${({ theme }) => theme.neobrutalColors.ORANGE};
  border: 2px solid black;
  color: white;
  padding: 0.2rem 1rem;
  margin: 0 0.4rem;
`;

export const StyledConfirmBtn = styled.button`
  background-color: ${({ theme }) => theme.neobrutalColors.WHITE};
  width: fit-content;
  margin-left: auto;
  display: block;
  margin-right: auto;
  margin-top: 3rem;
  padding: 1rem 2rem;
  border-radius: 1rem;
  border: 3px solid black;
  font-weight: 700;
  :hover {
    background-color: ${({ theme }) => theme.neobrutalColors.GREEN};
    transition: 100ms ease-in;
  }
`;
