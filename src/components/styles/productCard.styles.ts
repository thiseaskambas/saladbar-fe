import styled from 'styled-components';

export const StyledCardDiv = styled.div<{ img?: string }>`
  border-radius: ${({ theme }) => theme.productCard.borderRadius};
  min-width: fit-content;
  max-width: fit-content;
  height: fit-content;
  background-color: ${({ theme }) => theme.productCard.backgroundColor};
  white-space: nowrap;
  padding: ${({ theme }) => theme.productCard.padding};
  border: ${({ theme }) => theme.productCard.border};
  cursor: default;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${({ theme }) =>
      theme.createShadow(8, 8, 0, 0, theme.neobrutalColors.PURPLE)},
    ${({ theme }) =>
      theme.createShadow(8, 8, 0, 3, theme.neobrutalColors.DARKGRAY)};
  /* box-shadow: -5px 5px red, -5px 5px 0px 3px black; */
`;

export const StyledCardHeadDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  & h3 {
    font-size: 1.1rem;
  }
  & span {
    font-family: 'Roboto Slab', monospace;
  }
`;

export const StyledImgCtn = styled.div`
  width: 200px;
  height: 100px;
  border-top: ${({ theme }) => theme.productCard.border};
  border-bottom: ${({ theme }) => theme.productCard.border};
  overflow: hidden;
  margin-bottom: 1rem;
`;

export const StyledBtnCtn = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledProductBtn = styled.button<{ decrease?: boolean }>`
  border-left: 1rem solid transparent;
  border-right: 1rem solid transparent;
  border-bottom: 1rem solid
    ${({ theme, decrease }) =>
      decrease ? theme.neobrutalColors.YELLOW : theme.neobrutalColors.GREEN};
  border-top: 1rem solid transparent;
  display: inline-block;
  transform: rotate(${({ decrease }) => (decrease ? '-90deg' : '90deg')});
`;

export const StyledProductQ = styled.span`
  margin: 0.1rem 1rem;
  font-weight: 600;
  font-size: 1.1rem;
`;

export const StyledProductName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
`;

export const StyledAddToCartBtn = styled.button`
  width: 100%;
  padding: 0.2rem 1rem;
  font-size: 1.1rem;
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.neobrutalColors.MINT};

  transition: 200ms;
  :hover {
    background-color: ${({ theme }) => theme.neobrutalColors.GREEN};
  }
  :disabled {
  }
  :disabled:hover {
    background-color: ${({ theme }) => theme.neobrutalColors.YELLOW};
  }
`;
