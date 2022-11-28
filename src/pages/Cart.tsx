import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { RootState } from '../store/store';
import {
  StyledCartMain,
  StyledConfirmBtn,
  StytledGridCtn,
  StytledGridFooterItem,
} from './styles/cart.styles';

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <StyledCartMain>
      {cart.totalItems === 0 && (
        <div style={{ textAlign: 'center' }}>
          <p>The cart is empty!</p>
          <p>Add items to the cart from the main dashboard</p>
        </div>
      )}
      {cart.totalItems > 0 && (
        <StytledGridCtn>
          <li>Product</li>
          <li>Quantity</li>
          <li>Price</li>
          <li>Sub-total</li>
          {cart.products.map((el) =>
            el.quantity > 0 ? (
              <CartItem key={el.product.id} cartItem={el} />
            ) : null
          )}
          <StytledGridFooterItem>
            <span>Total Price : </span>
            <span style={{ marginLeft: '0.3rem' }}>
              {cart.products.reduce(
                (prev, curr) => prev + curr.product.price * curr.quantity,
                0
              )}
              €
            </span>
          </StytledGridFooterItem>
        </StytledGridCtn>
      )}
      {cart.totalItems > 0 && <StyledConfirmBtn>Confirm cart</StyledConfirmBtn>}
    </StyledCartMain>
  );
};

export default Cart;
