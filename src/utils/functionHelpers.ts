import { DateTime } from 'luxon';
import { ICart } from '../types/cart.types';

const convertToLocalEndDayTime = (date: Date): string => {
  return DateTime.fromJSDate(date).endOf('day').toString();
};
const convertToLocalStartDayTime = (date: Date): string => {
  return DateTime.fromJSDate(date).startOf('day').toString();
};

const convertToOneWeekAgo = (startOrEnd: 'start' | 'end') => {
  return startOrEnd === 'start'
    ? DateTime.now().minus({ weeks: 1 }).startOf('day').toString()
    : DateTime.now().minus({ weeks: 1 }).endOf('day').toString();
};

const calcCartStateTotalProducts = (carts: ICart[]): number => {
  const totalProductsSold = carts.reduce((allTotal, currCart) => {
    const currCartItemsSold = currCart.items.reduce((currTotal, currItem) => {
      return currTotal + currItem.quantity;
    }, 0);
    return allTotal + currCartItemsSold;
  }, 0);
  return totalProductsSold;
};

const calcCartStateTotalPrice = (carts: ICart[]): number => {
  const totalCartStatePrice = carts.reduce(
    (acc, curr) => acc + curr.totalPrice,
    0
  );
  return totalCartStatePrice;
};

const getUTCDayName = (): string => {
  return DateTime.utc().toLocaleString({ weekday: 'long' });
};

export default {
  convertToOneWeekAgo,
  calcCartStateTotalProducts,
  getUTCDayName,
  calcCartStateTotalPrice,
  convertToLocalEndDayTime,
  convertToLocalStartDayTime,
};
