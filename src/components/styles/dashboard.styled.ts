import styled from 'styled-components';
import { ProductCourseType } from '../../types/product.types';

interface Props {
  selected: ProductCourseType | 'all';
  setIsSelected?: (string: ProductCourseType | 'all') => void;
}

export const StyledDashContent = styled.div<Props>`
  padding-top: 42px;
  display: grid;
  height: fit-content;
  grid-template-columns: repeat(auto-fit, 235px);
  gap: 2rem;
`;
