import React from 'react';
import { IProduct } from '../types/product.types';
import { StyledCtnDiv } from './styles/deleteProduct.styles';

interface IProps {
  productName: IProduct['name'];
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteProduct = ({ productName, onCancel, onDelete }: IProps) => {
  return (
    <StyledCtnDiv>
      <div>
        Are you sure you want to delete{' '}
        <span className="productname">{productName} ?</span>
      </div>
      <div>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </StyledCtnDiv>
  );
};

export default DeleteProduct;
