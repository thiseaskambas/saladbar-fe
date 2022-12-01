import styled from 'styled-components';

export const StyledProductsGridDiv = styled.div`
  width: fit-content;
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr 1fr 1fr;
  column-gap: 1rem;
  row-gap: 0.2rem;
`;

export const StyledProductItem = styled.div`
  justify-self: start;
  & .filename {
    font-style: italic;
  }
`;
export const StyledProductPriceItem = styled.div`
  justify-self: end;
  margin-right: 1rem;
`;
