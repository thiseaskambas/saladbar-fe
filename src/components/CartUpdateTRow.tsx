import { useState } from 'react';
import { ICartItem } from '../types/cart.types';
import { StyledCartUpdateBtn } from './styles/cartUpdateForm';

export const CartUpdateTRow = ({ cartItem }: { cartItem: ICartItem }) => {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  return (
    <tr>
      <td>{cartItem.product?.name || 'product has been deleted'}</td>
      <td>{quantity}</td>
      {/* <td>€ {cartItem.itemPrice.toFixed(0)}</td> */}
      <td>
        <StyledCartUpdateBtn
          type="button"
          onClick={() => setQuantity((prev) => prev - 1)}
        >
          -
        </StyledCartUpdateBtn>{' '}
        <StyledCartUpdateBtn
          type="button"
          onClick={() => setQuantity((prev) => prev + 1)}
        >
          +
        </StyledCartUpdateBtn>
      </td>
    </tr>
  );
};
