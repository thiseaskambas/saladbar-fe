import {
  StyledSharedPriceTd,
  StyledSharedTd,
  StyledSharedTr,
} from '../pages/styles/shared.styles';
import { ICart } from '../types/cart.types';

interface IProps {
  cart: ICart;
}

const CartsTr = ({ cart }: IProps) => {
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
    <StyledSharedTr>
      <StyledSharedTd>{formatedDate.split(',').join(' - ')}</StyledSharedTd>
      <StyledSharedTd>
        <span className="italic">{cart.createdBy.username}</span>
      </StyledSharedTd>
      <StyledSharedPriceTd>{itemsQuantity}</StyledSharedPriceTd>
      <StyledSharedPriceTd>€{cart.totalPrice}</StyledSharedPriceTd>
      <StyledSharedPriceTd>
        €{cart.totalPrice / itemsQuantity}
      </StyledSharedPriceTd>
    </StyledSharedTr>
  );
};

export default CartsTr;

/*
 const adjusted = adjustForTimezone(date).toLocaleDateString('en-gb', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'long',
  });
  
  const adjustForTimezone = (date: Date): Date => {
  const timeOffsetInMS: number = date.getTimezoneOffset() * 60000;
  date.setTime(date.getTime() + timeOffsetInMS);
  return date;
};*/
