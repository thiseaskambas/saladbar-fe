import { useState } from 'react';
import { useSelector } from 'react-redux';
import Notification from '../components/Notification';

import ProductsTable from '../components/ProductsTable';

import { RootState } from '../store/store';
import { StyledFilterCtnDiv } from './styles/products.styles';
import { StyledSharedMain } from './styles/shared.styles';

const Products = () => {
  const notification = useSelector((state: RootState) => state.notification);
  const productsState = useSelector((state: RootState) => state.products);
  const [query, setQuery] = useState('');

  const productsFiltered = productsState.products.filter((prod) =>
    prod.name.toLocaleLowerCase().startsWith(query.toLocaleLowerCase())
  );
  return (
    <StyledSharedMain>
      <Notification notification={notification} />
      <StyledFilterCtnDiv>
        <label htmlFor="Search">Search : </label>
        <input id="Search" onChange={(e) => setQuery(e.target.value)}></input>
      </StyledFilterCtnDiv>
      {productsState.status === 'succeeded' && (
        <ProductsTable products={productsFiltered} />
      )}
    </StyledSharedMain>
  );
};

export default Products;
