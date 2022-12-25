import { useReducer } from 'react';
import { IProduct } from '../types/product.types';
import { addToCart } from '../store/localCart.slice';
import {
  StyledAddToCartBtn,
  StyledBtnCtn,
  StyledCardDiv,
  StyledCardHeadDiv,
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
      <StyledCardHeadDiv>
        <StyledProductName>
          {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
        </StyledProductName>
        <span>€ {product.price}</span>
      </StyledCardHeadDiv>
      <StyledImgCtn>
        <img src={product.image.url} />
      </StyledImgCtn>
      <StyledBtnCtn>
        <StyledProductBtn
          decrease
          onClick={() => localDispatch({ type: 'DECR' })}
        />
        <StyledProductQ>{localState.quantity}</StyledProductQ>
        <StyledProductBtn onClick={() => localDispatch({ type: 'INCR' })} />
      </StyledBtnCtn>
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
