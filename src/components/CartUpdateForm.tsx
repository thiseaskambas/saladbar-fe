import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { StyledSharedSelect } from '../pages/styles/shared.styles';
import { deleteCart, updateCart } from '../store/carts.slice';
import { addNewItem, initCartUpdate } from '../store/cartUpdate.slice';
import { initializeProducts } from '../store/products.slice';
import { RootState, useAppDispatch } from '../store/store';
import { ICart, ICartItem } from '../types/cart.types';
import { ILocalCartItemFormated } from '../types/localCart.types';

import { CartAddedProductTRow } from './CartAddedProductTRow';
import { CartUpdateTRow } from './CartUpdateTRow';
import {
  StyledCartUpdateBtn,
  StyledCartUpdateWarnBtn,
  StyledUpdateCartForm,
} from './styles/cartUpdateForm';

interface IProps {
  cart: ICart;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const toCartEntries = (cartItems: ICartItem[]): ILocalCartItemFormated[] => {
  const transformed: ILocalCartItemFormated[] = [];
  cartItems.forEach((item) => {
    if (item.quantity > 0) {
      transformed.push({
        product: item.product.id,
        quantity: item.quantity,
        discount: item?.discount || 0,
      });
    }
  });
  return transformed;
};

const CartUpdateForm = ({ cart, setIsFormOpen }: IProps) => {
  const dispatch = useAppDispatch();
  const { existingItems, newItems } = useSelector(
    (state: RootState) => state.updateCart
  );
  const { products, status } = useSelector(
    (state: RootState) => state.products
  );
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  const selectRef = useRef<HTMLSelectElement | null>(null);

  //TODO:initialize/fetch users /refactor useEffect hook
  useEffect(() => {
    let isMounted = true;
    const initProducts = async () => {
      try {
        await dispatch(initializeProducts()).unwrap();
      } catch (err) {
        console.log(err);
      }
    };
    if (status === 'idle' && isMounted) {
      initProducts();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    isMounted &&
      dispatch(
        initCartUpdate({ items: cart.items, discount: cart?.discount || 0 })
      );
    return () => {
      isMounted = false;
    };
  }, [cart]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cartDataToSend: ILocalCartItemFormated[] = [
      ...toCartEntries(existingItems),
      ...newItems,
    ];
    console.log({ cartDataToSend });
    if (cartDataToSend.length > 0) {
      await dispatch(
        updateCart({ cart: { items: cartDataToSend }, id: cart.id })
      );
      setIsFormOpen(false);
    } else {
      setIsDeleteClicked(true);
    }
  };

  const deleteHandler = async () => {
    try {
      await dispatch(deleteCart(cart.id)).unwrap();
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledUpdateCartForm onSubmit={(e) => submitHandler(e)}>
      <div>
        <label htmlFor="creator">Created by </label>
        <StyledSharedSelect
          name="creator"
          id="creator"
          isDisplayed={true}
          bgColor="white"
        >
          <option>{cart.createdBy.username}</option>
        </StyledSharedSelect>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {existingItems.map((el) => (
              <CartUpdateTRow
                key={el.product?.id || Math.random()}
                cartItem={el}
              />
            ))}
            {newItems.map((el) => (
              <CartAddedProductTRow
                key={el.product}
                cartItem={el}
                product={products.find((pr) => pr.id === el.product)}
              />
            ))}
          </tbody>
        </table>
        <div className="select-ctn">
          <StyledSharedSelect
            isDisplayed={true}
            bgColor="white"
            name="products"
            id="products"
            onChange={(e) => setSelectedProductId(e.target.value)}
            defaultValue="disabled"
            ref={selectRef}
          >
            <option disabled value="disabled">
              --select--
            </option>
            {products.map((el) => (
              <option
                key={el.id}
                value={el.id}
                disabled={
                  existingItems.findIndex(
                    (itm) => itm.product?.id === el.id
                  ) !== -1 ||
                  newItems.findIndex((itm) => itm.product === el.id) !== -1
                }
              >
                {el.name} | €{el.price}
              </option>
            ))}
          </StyledSharedSelect>
          <StyledCartUpdateBtn
            type="button"
            onClick={() => {
              if (selectedProductId) {
                console.log('adding ', selectedProductId);
                dispatch(addNewItem(selectedProductId));
              }
              if (selectRef.current) {
                selectRef.current.value = 'disabled';
              }
            }}
          >
            add
          </StyledCartUpdateBtn>
        </div>
        <div className="btn-ctn">
          <StyledCartUpdateBtn
            type="button"
            onClick={() => setIsFormOpen(false)}
          >
            Cancel
          </StyledCartUpdateBtn>

          <StyledCartUpdateBtn type="submit">Submit</StyledCartUpdateBtn>
        </div>
      </div>
      {!isDeleteClicked && (
        <StyledCartUpdateWarnBtn
          bgColor="orange"
          type="button"
          onClick={() => setIsDeleteClicked((prev) => !prev)}
        >
          Delete cart
        </StyledCartUpdateWarnBtn>
      )}
      {isDeleteClicked && (
        <div className="delete-confirm">
          <p>Are you sure you want to delete the cart?</p>
          <div>
            <StyledCartUpdateWarnBtn
              type="button"
              onClick={() => setIsDeleteClicked(false)}
              bgColor="orange"
            >
              No
            </StyledCartUpdateWarnBtn>
            <StyledCartUpdateWarnBtn type="button" onClick={deleteHandler}>
              Yes
            </StyledCartUpdateWarnBtn>
          </div>
        </div>
      )}
    </StyledUpdateCartForm>
  );
};

export default CartUpdateForm;
