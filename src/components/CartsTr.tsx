import {
  StyledSharedPriceTd,
  StyledSharedTd,
  StyledSharedTr,
} from '../pages/styles/shared.styles';
import { ICart } from '../types/cart.types';

interface IProps {
  cart: ICart;
  onClick?: () => void;
}

const CartsTr = ({ cart, onClick }: IProps) => {
  const date = new Date(cart.createdAt);
  const formatedDate = date.toLocaleDateString('en-gb', {
    year: '2-digit',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  const itemsQuantity = cart.items.reduce(
    (sum, next) => sum + next.quantity,
    0
  );
  return (
    <StyledSharedTr onClick={onClick} clickable={true}>
      <StyledSharedTd>{formatedDate.split(',').join(' - ')}</StyledSharedTd>
      <StyledSharedTd>
        <span className="italic">{cart.createdBy.username}</span>
      </StyledSharedTd>
      <StyledSharedPriceTd>{itemsQuantity}</StyledSharedPriceTd>
      <StyledSharedPriceTd>€{cart.totalPrice.toFixed(2)}</StyledSharedPriceTd>
      <StyledSharedPriceTd>
        €{(cart.totalPrice / itemsQuantity).toFixed(2)}
      </StyledSharedPriceTd>
    </StyledSharedTr>
  );
};

export default CartsTr;
