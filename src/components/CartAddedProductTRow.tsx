import { addNewItem, removeNewItem } from '../store/cartUpdate.slice';
import { useAppDispatch } from '../store/store';
import { ILocalCartItemFormated } from '../types/localCart.types';

import { IProduct } from '../types/product.types';
import { StyledCartUpdateBtn } from './styles/cartUpdateForm';

interface IProps {
  cartItem: ILocalCartItemFormated;
  product?: IProduct;
}

export const CartAddedProductTRow = ({ cartItem, product }: IProps) => {
  const dispatch = useAppDispatch();
  return (
    <tr>
      <td>{product?.name}</td>
      <td>{cartItem.quantity}</td>
      <td>€ {product?.price}</td>
      <td>
        <StyledCartUpdateBtn
          type="button"
          onClick={() => dispatch(removeNewItem(cartItem.product))}
        >
          -
        </StyledCartUpdateBtn>{' '}
        <StyledCartUpdateBtn
          type="button"
          onClick={() => dispatch(addNewItem(cartItem.product))}
        >
          +
        </StyledCartUpdateBtn>
      </td>
    </tr>
  );
};
