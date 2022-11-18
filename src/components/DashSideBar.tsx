import React from 'react';
import { IProduct } from '../types/product.types';
import { StyledDashSideBar } from './styles/dashSide.styled';

interface Props {
  display: boolean;
  products: IProduct[];
}

const DashSideBar = ({ display, products }: Props) => {
  const courseTypes: string[] = products.reduce(
    (acc: string[], curr) =>
      acc.find((el) => el === curr.productCourseType)
        ? acc
        : [...acc, curr.productCourseType],
    []
  );

  return (
    <StyledDashSideBar display={display}>
      DashSideBar{' '}
      {courseTypes.map((el) => (
        <div key={el}>{el}</div>
      ))}
    </StyledDashSideBar>
  );
};

export default DashSideBar;
