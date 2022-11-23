import { useReducer } from 'react';
import { IProduct } from '../types/product.types';

import {
  StyledAddToCartBtn,
  StyledCardDiv,
  StyledImgCtn,
  StyledProductBtn,
  StyledProductName,
  StyledProductQ,
} from './styles/productCard.styles';

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
const initialState = { quantity: 0 };

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
  const [state, dispatch] = useReducer(reducer, initialState);

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
        <StyledProductBtn onClick={() => dispatch({ type: 'DECR' })}>
          -
        </StyledProductBtn>
        <StyledProductQ>{state.quantity}</StyledProductQ>
        <StyledProductBtn onClick={() => dispatch({ type: 'INCR' })}>
          +
        </StyledProductBtn>
      </div>
      <StyledAddToCartBtn>Add to cart</StyledAddToCartBtn>
    </StyledCardDiv>
  );
};

export default ProductCard;
