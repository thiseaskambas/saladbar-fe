import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import DashSideBar from '../components/DashSideBar';
import ProductCard from '../components/ProductCard';
import { StyledDashContent } from '../components/styles/dashboard.styles';

import { RootState } from '../store/store';
import { isProductCourseType, ProductCourseType } from '../types/product.types';
import { StyledMainDash } from './styles/mainDash.styles';

const MainDashBoard = () => {
  const productsState = useSelector((state: RootState) => state.products);
  const [sideBarDisplay, setSideBarDisp] = useState(true);
  const [isSelected, setIsSelected] = useState<ProductCourseType | 'all'>(
    'all'
  );

  const handleSelect = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = (e.target as HTMLElement).innerText;
    if (isProductCourseType(target)) {
      setIsSelected(target);
    } else {
      setIsSelected('all');
    }
  };

  return (
    <StyledMainDash>
      <DashSideBar
        show={sideBarDisplay}
        products={productsState.products}
        setSideBarDisp={setSideBarDisp}
        selected={isSelected}
        setIsSelected={handleSelect}
      />
      <StyledDashContent selected={isSelected}>
        {productsState.products.map((el) =>
          isSelected === 'all' ? (
            <ProductCard key={el.id} product={el} />
          ) : el.productCourseType === isSelected ? (
            <ProductCard key={el.id} product={el} />
          ) : null
        )}
      </StyledDashContent>
    </StyledMainDash>
  );
};

export default MainDashBoard;
