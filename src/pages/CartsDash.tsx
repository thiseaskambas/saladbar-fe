import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import 'rsuite/dist/rsuite.min.css';
import { DateRangePicker, InputPicker } from 'rsuite';

import {
  startOfDay,
  endOfDay,
  addDays,
  subDays,
  startOfMonth,
  lastDayOfMonth,
} from 'date-fns';
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
  {
    label: 'This Month',
    value: [startOfMonth(new Date()), endOfDay(lastDayOfMonth(new Date()))],
    closeOverlay: false,
  },
];

const data = [10, 20, 30].map((item) => ({ label: item, value: item }));

const CartsDash = () => {
  const cartsState = useSelector((state: RootState) => state.carts);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSizeLimit, setLimit] = useState(10);
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
      <div>
        <label>Carts to display : </label>
        <InputPicker
          data={data}
          onChange={(value: string) => {
            setLimit(Number(value)), setCurrentPage(1);
          }}
          cleanable={false}
          defaultValue="10"
          placeholder="10"
          style={{ width: '5rem' }}
        />
        <DateRangePicker
          style={{ width: 230 }}
          onOk={(value: [Date, Date]) => dateSelectHandler(value)}
          placeholder="click to select dates"
          preventOverflow={true}
          showWeekNumbers
          showOneCalendar={false}
          ranges={RANGES}
        />
      </div>

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
