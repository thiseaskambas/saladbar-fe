import {
  StyledCardQButton,
  StytledGridItem,
} from '../pages/styles/cart.styles';
import { addToCart, removeFromCart } from '../store/localCart.slice';
import { useAppDispatch } from '../store/store';
import { ILocalCartItem } from '../types/localCart.types';

const CartItem = ({ cartItem }: { cartItem: ILocalCartItem }) => {
  const dispatch = useAppDispatch();
  const decrHandler = () => {
    dispatch(removeFromCart(cartItem.product.id));
  };
  const incrHandler = () => {
    dispatch(addToCart({ product: cartItem.product, quantity: 1 }));
  };
  return (
    <>
      <StytledGridItem>{cartItem.product.name}</StytledGridItem>
      <StytledGridItem>
        <StyledCardQButton onClick={decrHandler}>-</StyledCardQButton>
        {cartItem.quantity}
        <StyledCardQButton onClick={incrHandler}>+</StyledCardQButton>
      </StytledGridItem>
      <StytledGridItem>{cartItem.product.price}</StytledGridItem>
      <StytledGridItem>
        {cartItem.product.price * cartItem.quantity}
      </StytledGridItem>
    </>
  );
};

export default CartItem;
