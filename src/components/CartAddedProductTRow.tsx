import { useState } from 'react';
import { ICartItemEntry } from '../types/cart.types';
import { IProduct } from '../types/product.types';
import { StyledCartUpdateBtn } from './styles/cartUpdateForm';

export const CartAddedProductTRow = ({
  cartItem,
  product,
}: {
  cartItem: ICartItemEntry;
  product?: IProduct;
}) => {
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
