import styled from 'styled-components';

export const StyledHamburger = styled.div<{ sideBarDisplay: boolean }>`
  align-self: flex-start;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.darkBrown};
  & .line {
    width: 35px;
    height: 4px;
    background-color: #333;
    margin: 6px 0;
    transition: 0.4s;
  }
  ${(props) =>
    props.sideBarDisplay &&
    `
    left: 0;
    
    & .line1 {
      transform: translate(0, 10px) rotate(-45deg);
    }
    & .line2 {
      opacity: 0;
    }
    & .line3 {
      transform: translate(0, -10px) rotate(45deg);
    }
    
    `}
`;
