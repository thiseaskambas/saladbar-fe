import MediaQuery from 'react-responsive';
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
      <MediaQuery minWidth={999}>
        <StyledSharedTd>
          <span className="italic">{cart.createdBy.username}</span>
        </StyledSharedTd>
      </MediaQuery>
      <StyledSharedPriceTd>{itemsQuantity}</StyledSharedPriceTd>
      <StyledSharedPriceTd>€{cart.totalPrice.toFixed(2)}</StyledSharedPriceTd>
      <MediaQuery minWidth={999}>
        <StyledSharedPriceTd>
          €{(cart.totalPrice / itemsQuantity).toFixed(2)}
        </StyledSharedPriceTd>
      </MediaQuery>
    </StyledSharedTr>
  );
};

export default CartsTr;
