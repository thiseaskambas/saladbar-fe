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
const pageLimits = [10, 20, 30];

const adjustForTimezone = (date: Date): Date => {
  const timeOffsetInMS: number = date.getTimezoneOffset() * 60000;
  date.setTime(date.getTime() - timeOffsetInMS);
  return date;
};

const CartsDash = () => {
  const cartsState = useSelector((state: RootState) => state.carts);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSizeLimit, setLimit] = useState(10);
  const [afterDate, setAfterDate] = useState<string | null>(null);
  const [beforeDate, setBeforeDate] = useState<string | null>(null);
  const [dispaly, setDisplay] = useState(false);
  const [state, setState] = useState<IDateRangeState[]>([
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
    const utcAfter = DateTime.fromJSDate(startDate)
      .setZone('utc', {
        keepLocalTime: true,
      })
      .toString();
    const utcBefore = DateTime.fromJSDate(endDate)
      .setZone('utc', {
        keepLocalTime: true,
      })
      .toString();
    console.log({ utcAfter });
    setAfterDate(utcAfter);
    setBeforeDate(utcBefore);
  };

  return (
    <StyledSharedMain>
      <div>
        <button onClick={() => setDisplay((prev) => !prev)}>
          Select dates
        </button>
        {dispaly && (
          <div>
            <DateRangePicker
              // @ts-expect-error can't find docs
              onChange={(item) => setState(() => [item.selection])}
              // @ts-expect-error can't find docs
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={1}
              ranges={state}
              direction="horizontal"
              weekStartsOn={1}
            />
            <button onClick={() => dateRangeHandler(state[0])}>
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
