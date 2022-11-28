import styled from 'styled-components';

export const StyledHamburger = styled.div<{ sideBarDisplay: boolean }>`
  align-self: flex-start;
  cursor: pointer;
  border-radius: 50%;
  padding: 8px;
  margin: 5px;
  background-color: ${({ theme }) => theme.colors.lightBrown};
  transform: scale(0.9);

  & .line {
    width: 35px;
    height: 4px;
    background-color: #333;
    margin: 6px auto;
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
