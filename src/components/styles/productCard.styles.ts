import styled from 'styled-components';

export const StyledCardDiv = styled.div<{ img?: string }>`
  border-radius: 1rem;
  min-width: fit-content;
  max-width: fit-content;
  height: fit-content;
  /* background-image: ${(props) => props.img}; */
  background-color: ${({ theme }) => theme.colors.lightBlue};
  white-space: nowrap;
  padding: 1rem;
  cursor: default;
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-box-shadow: ${({ theme }) => theme.backDropShadow.webkitboxShadow};
  -moz-box-shadow: ${({ theme }) => theme.backDropShadow.mozzilaboxShadow};
  box-shadow: ${({ theme }) => theme.backDropShadow.boxShadow};
`;

export const StyledImgCtn = styled.div`
  width: 200px;
  height: 100px;
  margin: 1rem 0;
  border: 5px solid ${({ theme }) => theme.colors.lightBrown};
  /* display: flex; */
  /* align-items: center; */
  overflow: hidden;

  & img {
    /* flex-shrink: 0; */
    /* min-width: 100%; */
    /* min-height: 100%; */
  }
`;

export const StyledProductBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.lightBrown};
  padding: 0.2rem 1rem;
  font-size: 1.5rem;
  border-radius: 0.5rem;
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
  border-radius: 0.5rem;
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.colors.lightYellow};
`;
