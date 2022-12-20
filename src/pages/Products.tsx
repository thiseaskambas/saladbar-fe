import { useSelector } from 'react-redux';

import ProductsTable from '../components/ProductsTable';

import { RootState } from '../store/store';
import { StyledSharedMain } from './styles/shared.styles';

const Products = () => {
  const productsState = useSelector((state: RootState) => state.products);

  return (
    <StyledSharedMain>
      {productsState.status === 'succeeded' && (
        <ProductsTable products={productsState.products} />
      )}
    </StyledSharedMain>
  );
};

export default Products;
