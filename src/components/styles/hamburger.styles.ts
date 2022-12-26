import styled from 'styled-components';

export const StyledHamburger = styled.div<{ sideBarDisplay: boolean }>`
  align-self: flex-start;
  cursor: pointer;
  border: 3px solid ${({ theme }) => theme.neobrutalColors.DARKGRAY};
  box-shadow: ${({ theme }) =>
    theme.createShadow(5, 5, 0, 0, theme.neobrutalColors.DARKGRAY)};
  padding: 8px;
  margin: 5px;
  background-color: ${({ theme }) => theme.neobrutalColors.PURPLE};
  transform: scale(0.7);

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
