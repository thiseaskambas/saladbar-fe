import React from 'react';
import { StyledSharedTable } from '../pages/styles/shared.styles';
import { ICart } from '../types/cart.types';
import CartsTr from './CartsTr';

interface IProps {
  carts: ICart[];
}

const CartsTable = ({ carts }: IProps) => {
  return (
    <StyledSharedTable>
      <thead>
        <tr>
          <th>Date</th>
          <th>User</th>
          <th>Items</th>
          <th>Total</th>
          <th>Avg Item Price</th>
        </tr>
      </thead>
      <tbody>
        {carts.map((el) => (
          <CartsTr key={el.id} cart={el} />
        ))}
      </tbody>
    </StyledSharedTable>
  );
};

export default CartsTable;
