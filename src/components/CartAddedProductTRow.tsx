import { useState } from 'react';
import { ILocalCartItemFormated } from '../types/localCart.types';

import { IProduct } from '../types/product.types';
import { StyledCartUpdateBtn } from './styles/cartUpdateForm';

interface IProps {
  cartItem: ILocalCartItemFormated;
  product?: IProduct;
}

export const CartAddedProductTRow = ({ cartItem, product }: IProps) => {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  return (
    <tr>
      <td>{product?.name}</td>
      <td>{quantity}</td>
      {/* <td>€ {product?.price}</td> */}
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
