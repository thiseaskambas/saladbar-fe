import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import CartsTable from '../components/CartsTable';
import { useInitializeData } from '../hooks/useInititalizeData';
import { usePagination } from '../hooks/usePagination';
import { initializeCarts } from '../store/carts.slice';
import { RootState } from '../store/store';
import { Pagination } from './Pagination';
import { StyledSharedMain } from './styles/shared.styles';

const CartsDash = () => {
  const date1 = new Date();
  const date2 = new Date();
  const dayStart = new Date(date1.setUTCHours(0, 0, 0, 0));
  const dayEnd = new Date(date2.setUTCHours(23, 59, 59, 999));

  const cartsState = useSelector((state: RootState) => state.carts);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSizeLimit, _setLimit] = useState(25);
  const [afterDate, _setAfterDate] = useState<Date | null>(dayStart);
  const [beforeDate, _setBeforeDate] = useState<Date | null>(dayEnd);

  const options = useMemo(() => {
    return {
      page: currentPage - 1,
      limit: pageSizeLimit,
      after: afterDate,
      before: beforeDate,
    };
  }, [currentPage, pageSizeLimit, beforeDate, afterDate]);

  useInitializeData(initializeCarts, options, cartsState.status);

  const pages = usePagination({
    currentPage,
    pageSizeLimit,
    totalItems: cartsState.totalCarts,
  });

  return (
    <StyledSharedMain>
      {cartsState.status === 'succeeded' && (
        <CartsTable carts={cartsState.carts} />
      )}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
      />
    </StyledSharedMain>
  );
};

export default CartsDash;
