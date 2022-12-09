import { DateTime } from 'luxon';

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

export default { convertToUTCString, convertToUTCEndDayString };
