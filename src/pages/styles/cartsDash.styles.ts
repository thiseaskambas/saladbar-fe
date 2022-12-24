import styled from 'styled-components';

export const StyledDatePickerCtnDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledCartDashBtn = styled.button<{ isDisplayed: boolean }>`
  display: ${({ isDisplayed }) => (isDisplayed ? 'inline-block' : 'none')};
  background-color: ${({ theme }) => theme.neobrutalColors.PURPLE};
  padding: ${({ theme }) => theme.paddings.standard};
  border: ${({ theme }) => theme.borders.thin};
  border-radius: 0.25rem;
`;

export const StyledCartDateBtnCtnDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const StyledCartDashDateBtn = styled.button<{
  isDisplayed: boolean;
  btnType?: 'confirm' | 'cancel';
}>`
  display: ${({ isDisplayed }) => (isDisplayed ? 'inline-block' : 'none')};
  background-color: ${({ btnType, theme }) =>
    btnType === 'cancel'
      ? theme.neobrutalColors.ORANGE
      : theme.neobrutalColors.GREEN};
  color: white;
  padding: 0.5rem 1rem;
`;
