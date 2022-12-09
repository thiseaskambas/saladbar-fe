import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductsTable from '../components/ProductsTable';
import { initializeProducts } from '../store/products.slice';
import { RootState, useAppDispatch } from '../store/store';
import { StyledSharedMain } from './styles/shared.styles';

const Products = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const productsState = useSelector((state: RootState) => state.products);

  useEffect(() => {
    let isMounted = true;
    const initProducts = async () => {
      try {
        await dispatch(initializeProducts()).unwrap();
      } catch (err) {
        //TODO: NOTIFICATION
        navigate('/login', { state: { from: location }, replace: true });
      }
    };
    if (productsState.status === 'idle' && isMounted) {
      initProducts();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <StyledSharedMain>
      {productsState.status === 'succeeded' && (
        <ProductsTable products={productsState.products} />
      )}
    </StyledSharedMain>
  );
};

export default Products;
