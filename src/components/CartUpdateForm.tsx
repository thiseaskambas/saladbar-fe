import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  StyledSharedColoredBtn,
  StyledSharedSelect,
} from '../pages/styles/shared.styles';
import { deleteCart, updateCart } from '../store/carts.slice';
import { addNewItem, initCartUpdate } from '../store/cartUpdate.slice';
import {
  resetNotification,
  setAsyncNotification,
  setNotification,
} from '../store/notification.slice';

import { RootState, useAppDispatch } from '../store/store';
import { ICart, ICartItem } from '../types/cart.types';
import { ILocalCartItemFormated } from '../types/localCart.types';

import { CartAddedProductTRow } from './CartAddedProductTRow';
import { CartUpdateTRow } from './CartUpdateTRow';
import Notification from './Notification';
import {
  StyledDeleteCartBtn,
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
  const notification = useSelector((state: RootState) => state.notification);
  const { products } = useSelector((state: RootState) => state.products);
  const { existingItems, newItems } = useSelector(
    (state: RootState) => state.updateCart
  );

  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const selectRef = useRef<HTMLSelectElement | null>(null);

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
    dispatch(setNotification({ text: 'Hold on...', type: 'loading' }));
    const cartDataToSend: ILocalCartItemFormated[] = [
      ...toCartEntries(existingItems),
      ...newItems,
    ];

    if (cartDataToSend.length > 0) {
      await dispatch(
        updateCart({ cart: { items: cartDataToSend }, id: cart.id })
      );
      dispatch(
        setAsyncNotification({ type: 'success', text: 'Cart saved!', time: 5 })
      );
    } else {
      setIsDeleteClicked(true);
    }
  };

  const deleteHandler = async () => {
    dispatch(setNotification({ type: 'loading', text: 'Deleting...' }));
    try {
      await dispatch(deleteCart(cart.id)).unwrap();
      setIsFormOpen(false);
      dispatch(resetNotification());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      dispatch(
        setAsyncNotification({
          type: 'error',
          text: err?.message,
          time: 6,
        })
      );
    }
  };

  return (
    <StyledUpdateCartForm onSubmit={(e) => submitHandler(e)}>
      <div>{notification.text}</div>
      <div className="main-ctn">
        <div>
          <label htmlFor="creator">Created by </label>
          <StyledSharedSelect
            name="creator"
            id="creator"
            isDisplayed={true}
            bgColor
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
              bgColor
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
            <StyledSharedColoredBtn
              bgColor="PURPLE"
              type="button"
              onClick={() => {
                if (selectedProductId) {
                  dispatch(addNewItem(selectedProductId));
                }
                if (selectRef.current) {
                  selectRef.current.value = 'disabled';
                }
              }}
            >
              add
            </StyledSharedColoredBtn>
          </div>
        </div>
      </div>
      {!isDeleteClicked && (
        <div className="btn-ctn">
          <StyledDeleteCartBtn
            borderSquare
            bgColor="ORANGE"
            type="button"
            onClick={() => setIsDeleteClicked((prev) => !prev)}
          ></StyledDeleteCartBtn>
          <StyledSharedColoredBtn
            borderSquare
            bgColor="YELLOW"
            type="button"
            onClick={() => setIsFormOpen(false)}
          >
            Cancel
          </StyledSharedColoredBtn>
          <StyledSharedColoredBtn bgColor="PURPLE" type="submit" borderSquare>
            Submit
          </StyledSharedColoredBtn>
        </div>
      )}

      {isDeleteClicked && (
        <div className="delete-confirm">
          <p>Are you sure you want to delete the cart?</p>
          <Notification notification={notification} />
          <div>
            <StyledSharedColoredBtn
              type="button"
              onClick={() => setIsDeleteClicked(false)}
              bgColor="ORANGE"
            >
              No
            </StyledSharedColoredBtn>
            <StyledSharedColoredBtn
              bgColor="GREEN"
              type="button"
              onClick={deleteHandler}
            >
              Yes
            </StyledSharedColoredBtn>
          </div>
        </div>
      )}
    </StyledUpdateCartForm>
  );
};

export default CartUpdateForm;
