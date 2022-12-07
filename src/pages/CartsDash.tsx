import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

import { DateTime } from 'luxon';

import CartsTable from '../components/CartsTable';
import { useInitializeData } from '../hooks/useInititalizeData';
import { usePagination } from '../hooks/usePagination';
import { initializeCarts } from '../store/carts.slice';
import { RootState } from '../store/store';
import { Pagination } from './Pagination';
import { StyledSharedMain } from './styles/shared.styles';

interface IDateRangeState {
  startDate: Date;
  endDate: Date;
  key: string;
}

const PAGE_LIMITS = [10, 20, 30];

const convertToUTCString = (date: Date): string => {
  return DateTime.fromJSDate(date)
    .setZone('utc', {
      keepLocalTime: true,
    })
    .toString();
};
const convertToUTCEndDayString = (date: Date): string => {
  return DateTime.fromMillis(date.setUTCHours(23, 59, 59, 999))
    .setZone('utc', {
      keepLocalTime: false,
    })
    .toString();
};

const CartsDash = () => {
  const cartsState = useSelector((state: RootState) => state.carts);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSizeLimit, setLimit] = useState(10);
  const [afterDate, setAfterDate] = useState<string | null>(null);
  const [beforeDate, setBeforeDate] = useState<string | null>(null);
  const [dispaly, setDisplay] = useState(false);
  const [rangeState, setRangeState] = useState<IDateRangeState[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const options = useMemo(() => {
    return {
      page: currentPage - 1,
      limit: pageSizeLimit,
      after: afterDate,
      before: beforeDate,
    };
  }, [currentPage, pageSizeLimit, afterDate, beforeDate]);

  useInitializeData(initializeCarts, options, cartsState.status);

  const pages = usePagination({
    currentPage,
    pageSizeLimit,
    totalItems: cartsState.totalCarts,
  });

  const dateRangeHandler = ({ startDate, endDate }: IDateRangeState) => {
    setAfterDate(convertToUTCString(startDate));
    if (startDate.toISOString() === endDate.toISOString()) {
      setBeforeDate(convertToUTCEndDayString(endDate));
    } else {
      setBeforeDate(convertToUTCString(endDate));
    }
  };

  return (
    <StyledSharedMain>
      <div>
        <select onChange={(e) => setLimit(Number(e.target.value))}>
          {PAGE_LIMITS.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
        <button onClick={() => setDisplay((prev) => !prev)}>
          Select dates
        </button>
        {dispaly && (
          <div>
            <DateRangePicker
              // @ts-expect-error can't find docs
              onChange={(item) => setRangeState(() => [item.selection])}
              // @ts-expect-error can't find docs
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={1}
              ranges={rangeState}
              direction="horizontal"
              weekStartsOn={1}
              maxDate={new Date()}
            />
            <button onClick={() => dateRangeHandler(rangeState[0])}>
              Select dates
            </button>
          </div>
        )}
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
