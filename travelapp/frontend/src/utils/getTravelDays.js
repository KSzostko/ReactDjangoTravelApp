import { addDays, isSameDay, format } from 'date-fns';

const getFormattedDate = (date) => format(date, 'dd.MM.yyyy');

const parseDate = (dateString) => {
  const [year, month, day] = dateString.split('-');

  return new Date(year, month - 1, day);
};

export const getTravelDays = (start, end) => {
  const startDate = typeof start === 'string' ? parseDate(start) : start;
  const endDate = typeof end === 'string' ? parseDate(end) : end;

  const result = [];
  let currentDate = new Date(startDate);

  while (!isSameDay(currentDate, endDate)) {
    result.push(getFormattedDate(currentDate));
    currentDate = addDays(currentDate, 1);
  }

  result.push(getFormattedDate(endDate));
  return result;
};
