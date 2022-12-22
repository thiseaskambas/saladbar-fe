import { useMemo } from 'react';
import {
  StatsCtnDiv,
  StyledBarCtnDiv,
  StyledH1,
  StyledH2,
} from './styles/today.styles';
import CounterDiv from '../components/TodayCounter';
import useMeasure from 'react-use-measure';
import helpers from '../utils/functionHelpers';
import { RootState } from '../store/store';

const TodayCharts = ({ cartsState }: { cartsState: RootState['carts'] }) => {
  const [ref, { width }] = useMeasure();

  const stats = useMemo(
    () => ({
      totalProductsSoldToday: helpers.calcCartStateTotalProducts(
        cartsState.carts
      ),
      totalProductsLastWeekday: helpers.calcCartStateTotalProducts(
        cartsState.tempCartsForStats
      ),
      totalRevenueToday: helpers.calcCartStateTotalPrice(cartsState.carts),
      totalRevenueLastWeekday: helpers.calcCartStateTotalPrice(
        cartsState.tempCartsForStats
      ),
    }),
    [cartsState.carts, cartsState.tempCartsForStats]
  );

  const weekday = helpers.getUTCDayName();
  return (
    <>
      <StyledH1>
        <span className="today">Today </span>
        <span className="vs">VS </span>
        <span className="last">Last {weekday}</span>
      </StyledH1>
      <StatsCtnDiv ref={ref}>
        <StyledH2>Products sold </StyledH2>
        <StyledBarCtnDiv>
          <CounterDiv
            referenceElement={stats.totalProductsSoldToday}
            comparedElement={stats.totalProductsLastWeekday}
            widthMeasured={width}
          />
        </StyledBarCtnDiv>

        <StyledBarCtnDiv lastWeek>
          <CounterDiv
            referenceElement={stats.totalProductsLastWeekday}
            comparedElement={stats.totalProductsSoldToday}
            widthMeasured={width}
          />
        </StyledBarCtnDiv>
        <StyledH2>Customers </StyledH2>
        <StyledBarCtnDiv>
          <CounterDiv
            referenceElement={cartsState.totalCarts}
            comparedElement={cartsState.tempTotalCarts}
            widthMeasured={width}
          />
        </StyledBarCtnDiv>

        <StyledBarCtnDiv lastWeek>
          <CounterDiv
            referenceElement={cartsState.tempTotalCarts}
            comparedElement={cartsState.totalCarts}
            widthMeasured={width}
          />
        </StyledBarCtnDiv>

        <StyledH2>Revenue </StyledH2>
        <StyledBarCtnDiv labelBefore={'€'}>
          <CounterDiv
            referenceElement={stats.totalRevenueToday}
            comparedElement={stats.totalRevenueLastWeekday}
            widthMeasured={width}
          />
        </StyledBarCtnDiv>

        <StyledBarCtnDiv lastWeek labelBefore={'€'}>
          <CounterDiv
            referenceElement={stats.totalRevenueLastWeekday}
            comparedElement={stats.totalRevenueToday}
            widthMeasured={width}
          />
        </StyledBarCtnDiv>
      </StatsCtnDiv>
    </>
  );
};

export default TodayCharts;
