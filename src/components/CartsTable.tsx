import React, { useState } from 'react';

import { StyledSharedTable } from '../pages/styles/shared.styles';
import { ICart } from '../types/cart.types';
import CartsTr from './CartsTr';
import CartUpdateForm from './CartUpdateForm';
import Modal from './Modal';
import { StyledModalCtnDiv } from './styles/modal.styles';

interface IProps {
  carts: ICart[];
}

const CartsTable = ({ carts }: IProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSelectedCart, setIsSelectedCart] = useState<ICart | null>(null);

  const selectHandler = (cart: ICart) => {
    setIsEditOpen(true);
    setIsSelectedCart(cart);
  };

  return (
    <>
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
            <CartsTr key={el.id} cart={el} onClick={() => selectHandler(el)} />
          ))}
        </tbody>
      </StyledSharedTable>
      <Modal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        modalTitle="Edit Cart"
      >
        <StyledModalCtnDiv>
          {isSelectedCart && <CartUpdateForm cart={isSelectedCart} />}
        </StyledModalCtnDiv>
      </Modal>
    </>
  );
};

export default CartsTable;
