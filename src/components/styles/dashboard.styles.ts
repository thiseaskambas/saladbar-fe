import styled from 'styled-components';
import { ProductCourseType } from '../../types/product.types';

interface Props {
  selected: ProductCourseType | 'all';
  setIsSelected?: (string: ProductCourseType | 'all') => void;
}

export const StyledDashContentDiv = styled.div<Props>`
  padding-top: 42px;
  display: grid;
  height: fit-content;
  grid-template-columns: repeat(auto-fit, 235px);
  gap: 2rem;
  margin-bottom: 42px;
`;

export const StyledMainDash = styled.main`
  display: grid;
  grid-template-columns: min-content auto;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;
