import React from 'react';
import { IProduct } from '../types/product.types';
import { StyledCardDiv, StyledImgCtn } from './styles/productCard.styles';

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <StyledCardDiv>
      <h3>{product.name}</h3>
      <div>{product.price}</div>
      <StyledImgCtn>
        <img src={product.image.url} />
      </StyledImgCtn>
    </StyledCardDiv>
  );
};

export default ProductCard;
