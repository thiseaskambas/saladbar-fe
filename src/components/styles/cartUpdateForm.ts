import styled from 'styled-components';
import images from '../../assets';
import { KeyofNeoBrColors } from '../../styleUtils/theme';

export const StyledUpdateCartForm = styled.form`
  display: flex;
  flex-direction: column;

  & td {
    font-weight: 300;
    font-size: 0.9rem;
  }

  & table {
    margin: 2rem 0;
    text-align: center;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    padding: 1rem;
    & button {
      font-weight: 400;
    }
  }
  & th {
    font-weight: 500;
    padding: 0 0.5rem;
  }

  & .delete-confirm {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem;
    gap: 0.5rem;
    background-color: ${({ theme }) => theme.colors.lightGray};
    padding: 1rem;
    border-radius: 0.5rem;
    & button:first-of-type {
      margin-right: 1rem;
    }
  }

  & .btn-ctn {
    display: flex;
    width: 100%;
    & button {
      display: flex;
      flex-grow: 1;
      justify-content: center;
    }
  }

  & .select-ctn {
    display: flex;
    justify-content: center;
  }

  & .main-ctn {
    margin: 2rem;
  }
`;

export const StyledDeleteCartBtn = styled.button<{
  bgColor?: KeyofNeoBrColors;
  borderSquare?: boolean;
}>`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  border-radius: ${({ borderSquare }) => (borderSquare ? '0rem' : '0.25rem')};
  background: ${({ theme, bgColor }) =>
      bgColor && theme.neobrutalColors[bgColor]}
    url(${images['delete_closed.png']});
  background-size: contain;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  transition: all ease-in-out 200ms;
  :hover {
    background: ${({ theme, bgColor }) =>
        bgColor && theme.neobrutalColors[bgColor]}
      url(${images['delete_open.png']});

    background-size: contain;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    /* transform: scale(1.3); */
  }
`;
