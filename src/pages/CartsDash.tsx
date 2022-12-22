import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

import helpers from '../utils/functionHelpers';
import CartsTable from '../components/CartsTable';
import { useInitializeData } from '../hooks/useInititalizeData';
import { usePagination } from '../hooks/usePagination';
import { initializeCarts, resetCarts } from '../store/carts.slice';
import { RootState } from '../store/store';
import { Pagination } from './Pagination';
import { StyledSharedMain, StyledSharedSelect } from './styles/shared.styles';
import {
  StyledDatePickerCtnDiv,
  StyledCartDashBtn,
  StyledCartDashDateBtn,
  StyledCartDateBtnCtnDiv,
} from './styles/cartsDash.styles';

interface IDateRangeState {
  startDate: Date;
  endDate: Date;
  key: string;
}

const PAGE_LIMITS = [10, 20, 30];

const CartsDash = () => {
  const cartsState = useSelector((state: RootState) => state.carts);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSizeLimit, setLimit] = useState(10);
  const [afterDate, setAfterDate] = useState<string | null>(null);
  const [beforeDate, setBeforeDate] = useState<string | null>(null);
  const [display, setDisplay] = useState(false);
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

  useInitializeData(initializeCarts, options, cartsState.status, resetCarts);

  const pages = usePagination({
    currentPage,
    pageSizeLimit,
    totalItems: cartsState.totalCarts,
  });

  const dateRangeHandler = ({ startDate, endDate }: IDateRangeState) => {
    setAfterDate(() => new Date(startDate).toISOString());
    if (new Date(startDate).toISOString() === new Date(endDate).toISOString()) {
      setBeforeDate(helpers.convertToLocalEndDayTime(endDate));
    } else {
      setBeforeDate(() => new Date(endDate).toISOString());
    }
    setDisplay(() => false);
    setCurrentPage(1);
  };

  return (
    <StyledSharedMain>
      <div>
        <StyledSharedSelect
          isDisplayed={!display}
          onChange={(e) => {
            setLimit(Number(e.target.value)), setCurrentPage(1);
          }}
        >
          {PAGE_LIMITS.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </StyledSharedSelect>
        <StyledCartDashBtn
          onClick={() => setDisplay((prev) => !prev)}
          isDisplayed={!display}
        >
          Select dates
        </StyledCartDashBtn>
        {display && (
          <StyledDatePickerCtnDiv>
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

            <StyledCartDateBtnCtnDiv>
              <StyledCartDashDateBtn
                onClick={() => setDisplay(false)}
                isDisplayed={display}
                btnType="cancel"
              >
                Cancel
              </StyledCartDashDateBtn>
              <StyledCartDashDateBtn
                onClick={() => dateRangeHandler(rangeState[0])}
                isDisplayed={display}
              >
                Confirm
              </StyledCartDashDateBtn>
            </StyledCartDateBtnCtnDiv>
          </StyledDatePickerCtnDiv>
        )}
      </div>
      {cartsState.status === 'loading' ? (
        <div>Loading....</div>
      ) : cartsState.status === 'succeeded' && cartsState.carts.length > 0 ? (
        <CartsTable carts={cartsState.carts} />
      ) : (
        <div>no carts to show for the selected dates</div>
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
