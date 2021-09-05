import { getHours, getMinutes } from 'date-fns';

export const formatHour = (date) => {
  const parsedDate = new Date(date);
  const hours = getHours(parsedDate);
  const minutes = getMinutes(parsedDate);

  return `${hours < 9 ? '0' : ''}${hours}:${minutes < 9 ? '0' : ''}${minutes}`;
};
