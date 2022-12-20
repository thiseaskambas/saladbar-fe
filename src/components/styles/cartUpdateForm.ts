import styled from 'styled-components';

export const StyledCartUpdateBtn = styled.button<{
  bgColor?: 'white' | 'blue';
}>`
  background-color: ${({ theme, bgColor }) =>
    bgColor === 'white' ? theme.colors.white : theme.colors.newBlue};
  color: ${({ bgColor }) => (bgColor === 'white' ? 'black' : 'white')};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: all 100ms;

  :active {
    transform: scale(97%);
    filter: brightness(90%);
  }
`;

export const StyledCartUpdateWarnBtn = styled.button<{
  bgColor?: 'orange' | 'yellow';
}>`
  background-color: ${({ theme, bgColor }) =>
    bgColor === 'orange' ? theme.colors.orange : theme.colors.yellow};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
`;

export const StyledUpdateCartForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
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
    gap: 1rem;
    justify-content: center;
    margin: 1rem 0;
  }

  & .select-ctn {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
  }
`;
