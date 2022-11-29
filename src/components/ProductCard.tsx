import { useReducer } from 'react';
import { IProduct } from '../types/product.types';
import { addToCart } from '../store/cart.slice';
import {
  StyledAddToCartBtn,
  StyledCardDiv,
  StyledImgCtn,
  StyledProductBtn,
  StyledProductName,
  StyledProductQ,
} from './styles/productCard.styles';
import { useAppDispatch } from '../store/store';

const actions = {
  INCR: 'INCR',
  DECR: 'DECR',
  RST: 'RST',
};

type TQuantity = { quantity: number };
type TAction = {
  type: string;
  payload?: number;
};
const initialLocalState = { quantity: 0 };

const reducer = (state: TQuantity, action: TAction) => {
  switch (action.type) {
    case actions.INCR:
      return { quantity: state.quantity + 1 };
    case actions.DECR:
      if (state.quantity > 1) {
        return { quantity: state.quantity - 1 };
      } else {
        return { quantity: 0 };
      }
    case actions.RST:
      return { quantity: 0 };
    default:
      return { quantity: 0 };
  }
};

const ProductCard = ({ product }: { product: IProduct }) => {
  const [localState, localDispatch] = useReducer(reducer, initialLocalState);
  const dispatch = useAppDispatch();
  const clickHandler = () => {
    dispatch(addToCart({ product, quantity: localState.quantity }));
    localDispatch({ type: 'RST' });
  };

  return (
    <StyledCardDiv img={product.image.url}>
      <StyledProductName>
        {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
      </StyledProductName>
      <div>€ {product.price}</div>
      <StyledImgCtn>
        <img src={product.image.url} />
      </StyledImgCtn>
      <div>
        <StyledProductBtn onClick={() => localDispatch({ type: 'DECR' })}>
          -
        </StyledProductBtn>
        <StyledProductQ>{localState.quantity}</StyledProductQ>
        <StyledProductBtn onClick={() => localDispatch({ type: 'INCR' })}>
          +
        </StyledProductBtn>
      </div>
      <StyledAddToCartBtn
        disabled={localState.quantity < 1}
        onClick={clickHandler}
      >
        Add to cart
      </StyledAddToCartBtn>
    </StyledCardDiv>
  );
};

export default ProductCard;
