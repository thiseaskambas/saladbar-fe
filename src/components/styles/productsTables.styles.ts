import styled from 'styled-components';
import images from '../../assets/';

export const StyledDeleteSymbolBtn = styled.button`
  background: url(${images['delete_a.png']});
  background-size: contain;
  background-repeat: no-repeat;
  height: 1.5rem;
  width: 1.5rem;
  transition: all ease-in-out 200ms;
  :hover {
    background: url(${images['delete_b.png']});
    background-size: contain;
    background-repeat: no-repeat;
    transform: scale(1.3);
  }
`;

export const StyledEditBtn = styled.button`
  padding: 0 0;
  transition: all 200ms;
  :hover {
    transform: rotate(70deg);
  }
`;
