import { StyledSharedColoredBtn } from '../pages/styles/shared.styles';
import { addNewItem, removeNewItem } from '../store/cartUpdate.slice';
import { useAppDispatch } from '../store/store';
import { ILocalCartItemFormated } from '../types/localCart.types';

import { IProduct } from '../types/product.types';

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
        <StyledSharedColoredBtn
          bgColor="MINT"
          type="button"
          onClick={() => dispatch(removeNewItem(cartItem.product))}
        >
          -
        </StyledSharedColoredBtn>{' '}
        <StyledSharedColoredBtn
          bgColor="MINT"
          type="button"
          onClick={() => dispatch(addNewItem(cartItem.product))}
        >
          +
        </StyledSharedColoredBtn>
      </td>
    </tr>
  );
};
