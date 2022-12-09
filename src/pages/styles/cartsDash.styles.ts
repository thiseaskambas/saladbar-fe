import styled from 'styled-components';

export const StyledDatePickerCtnDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledCartDashBtn = styled.button<{ isDisplayed: boolean }>`
  display: ${({ isDisplayed }) => (isDisplayed ? 'inline-block' : 'none')};
  background-color: ${({ theme }) => theme.colors.newBlue};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
`;

export const StyledCartDateBtnCtnDiv = styled.div`
  background-color: beige;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const StyledCartDashDateBtn = styled.button<{
  isDisplayed: boolean;
  btnType?: 'confirm' | 'cancel';
}>`
  display: ${({ isDisplayed }) => (isDisplayed ? 'inline-block' : 'none')};
  background-color: ${({ btnType, theme }) =>
    btnType === 'cancel' ? theme.colors.orange : theme.colors.newBlue};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${({ btnType }) =>
    btnType === 'cancel' ? '0 0 0 0.25rem' : '0 0 0.25rem 0'};
`;
