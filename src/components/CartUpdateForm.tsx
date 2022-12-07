import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { initializeProducts } from '../store/products.slice';
import { RootState, useAppDispatch } from '../store/store';
import { ICart, ICartItem, ICartItemEntry } from '../types/cart.types';
import { IProduct } from '../types/product.types';

interface IProps {
  cart: ICart;
}

const CartUpdateTRow = ({ cartItem }: { cartItem: ICartItem }) => {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  return (
    <tr>
      <td>{cartItem.product?.name || 'product has been deleted'}</td>
      <td>{quantity}</td>
      <td>{cartItem.itemPrice}</td>
      <td>
        <button type="button" onClick={() => setQuantity((prev) => prev - 1)}>
          -
        </button>{' '}
        <button type="button" onClick={() => setQuantity((prev) => prev + 1)}>
          +
        </button>
      </td>
    </tr>
  );
};
const CartAddedProductTRow = ({
  cartItem,
  product,
}: {
  cartItem: ICartItemEntry;
  product?: IProduct;
}) => {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  return (
    <tr>
      <td>{product?.name}</td>
      <td>{quantity}</td>
      <td>{product?.price}</td>
      <td>
        <button type="button" onClick={() => setQuantity((prev) => prev - 1)}>
          -
        </button>{' '}
        <button type="button" onClick={() => setQuantity((prev) => prev + 1)}>
          +
        </button>
      </td>
    </tr>
  );
};

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

const CartUpdateForm = ({ cart }: IProps) => {
  const dispatch = useAppDispatch();
  const cartItems: ICartItem[] = cart.items;
  const [selectedProduct, setSelectedProduct] = useState<IProduct['id'] | null>(
    null
  );
  const [newCartEntries, setNewCartEntries] = useState<ICartItemEntry[]>([]);
  const { products, status } = useSelector(
    (state: RootState) => state.products
  );
  const selectRef = useRef<HTMLSelectElement | null>(null);
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

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <div>
        <label htmlFor="creator">Created by </label>
        <select name="creator" id="creator">
          <option>{cart.createdBy.username}</option>
        </select>
      </div>
      <div>
        <h2>add or remove products</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Remove/Add</th>
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
        <div>
          <select
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
          </select>
          <button
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
          </button>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CartUpdateForm;
