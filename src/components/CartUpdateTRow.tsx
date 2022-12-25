import { StyledSharedColoredBtn } from '../pages/styles/shared.styles';
import { addExistingItem, removeExistingItem } from '../store/cartUpdate.slice';
import { useAppDispatch } from '../store/store';
import { ICartItem } from '../types/cart.types';

interface IProps {
  cartItem: ICartItem;
}

export const CartUpdateTRow = ({ cartItem }: IProps) => {
  const dispatch = useAppDispatch();
  if (cartItem.quantity === 0) return null;
  return (
    <tr>
      <td>{cartItem.product?.name || 'product has been deleted'}</td>
      <td>{cartItem.quantity}</td>
      <td>€ {cartItem.itemPrice.toFixed(0)}</td>
      <td>
        <StyledSharedColoredBtn
          bgColor="MINT"
          type="button"
          onClick={() => dispatch(removeExistingItem(cartItem.product.id))}
        >
          -
        </StyledSharedColoredBtn>{' '}
        <StyledSharedColoredBtn
          bgColor="MINT"
          type="button"
          onClick={() => dispatch(addExistingItem(cartItem.product.id))}
        >
          +
        </StyledSharedColoredBtn>
      </td>
    </tr>
  );
};
