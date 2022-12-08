import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { StyledSharedSelect } from '../pages/styles/shared.styles';
import { deleteCart } from '../store/carts.slice';
import { initializeProducts } from '../store/products.slice';
import { RootState, useAppDispatch } from '../store/store';
import { ICart, ICartItem, ICartItemEntry } from '../types/cart.types';
import { IProduct } from '../types/product.types';
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

const toCartEntries = (cartItems: ICartItem[]): ICartItemEntry[] => {
  const transformed = cartItems.map((item) => {
    return {
      product: item.product?.id || Math.random().toString(),
      quantity: item.quantity,
      // discount: item?.discount,
    };
  });
  return transformed;
};

const CartUpdateForm = ({ cart, setIsFormOpen }: IProps) => {
  const dispatch = useAppDispatch();
  const cartItems: ICartItem[] = cart.items;
  console.log({ cartItems });
  const [selectedProduct, setSelectedProduct] = useState<IProduct['id'] | null>(
    null
  );
  const [newCartEntries, setNewCartEntries] = useState<ICartItemEntry[]>([]);
  const { products, status } = useSelector(
    (state: RootState) => state.products
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

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log([...toCartEntries(cartItems), ...newCartEntries]);
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
              {/* <th>Price</th> */}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((el) => (
              <CartUpdateTRow
                key={el.product?.id || Math.random()}
                cartItem={el}
              />
            ))}
            {newCartEntries.map((el) => (
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
            onChange={(e) => setSelectedProduct(e.target.value)}
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
                  cartItems.findIndex((itm) => itm.product?.id === el.id) !==
                    -1 ||
                  newCartEntries.findIndex((itm) => itm.product === el.id) !==
                    -1
                }
              >
                {el.name} | €{el.price}
              </option>
            ))}
          </StyledSharedSelect>
          <StyledCartUpdateBtn
            type="button"
            onClick={() => {
              if (selectedProduct) {
                setNewCartEntries((prev) => [
                  ...prev,
                  { product: selectedProduct, quantity: 1 },
                ]);
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
          <p>Are you sure ?</p>
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
