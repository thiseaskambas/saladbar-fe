import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import 'rsuite/dist/rsuite.min.css';
import { DateRangePicker } from 'rsuite';

import { startOfDay, endOfDay, addDays, subDays } from 'date-fns';
import { RangeType } from 'rsuite/esm/DateRangePicker';
import CartsTable from '../components/CartsTable';
import { useInitializeData } from '../hooks/useInititalizeData';
import { usePagination } from '../hooks/usePagination';
import { initializeCarts } from '../store/carts.slice';
import { RootState } from '../store/store';
import { Pagination } from './Pagination';
import { StyledSharedMain } from './styles/shared.styles';

const RANGES: RangeType[] = [
  {
    label: 'today',
    value: [startOfDay(new Date()), endOfDay(new Date())],
    closeOverlay: false,
  },
  {
    label: 'yesterday',
    value: [
      startOfDay(addDays(new Date(), -1)),
      endOfDay(addDays(new Date(), -1)),
    ],
    closeOverlay: false,
  },
  {
    label: 'last7Days',
    value: [startOfDay(subDays(new Date(), 6)), endOfDay(new Date())],
    closeOverlay: false,
  },
];

const CartsDash = () => {
  const cartsState = useSelector((state: RootState) => state.carts);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSizeLimit, _setLimit] = useState(25);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const options = useMemo(() => {
    return {
      page: currentPage - 1,
      limit: pageSizeLimit,
      after: dateRange[0],
      before: dateRange[1],
    };
  }, [currentPage, pageSizeLimit, dateRange[0], dateRange[1]]);

  useInitializeData(initializeCarts, options, cartsState.status);

  const pages = usePagination({
    currentPage,
    pageSizeLimit,
    totalItems: cartsState.totalCarts,
  });

  const dateSelectHandler = (range: [Date, Date]) => {
    const afterDate = new Date(range[0] + ' UTC');
    const beforeDate = new Date(range[1] + ' UTC');
    setDateRange([afterDate, beforeDate]);
  };

  return (
    <StyledSharedMain>
      <DateRangePicker
        style={{ width: 230 }}
        onOk={(value: [Date, Date]) => dateSelectHandler(value)}
        placeholder="click to select range"
        preventOverflow={true}
        showWeekNumbers
        showOneCalendar={false}
        ranges={RANGES}
      />

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
