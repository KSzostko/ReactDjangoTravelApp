import {
  differenceInSeconds,
  getHours,
  getMinutes,
  addDays,
  setHours,
  setMinutes,
} from 'date-fns';
import { parseDate } from 'utils';

export const dateFormat = 'yyyy-MM-dd HH:mm';

export function getStartDateTime(startDate, { hours, minutes }) {
  const dateString = `${startDate} ${hours}:${minutes}`;
  return parseDate(dateString, dateFormat);
}

export function extractStopsDuration(stopsList) {
  return stopsList.map((stop) => {
    const { start_date: start, end_date: end, attraction } = stop;
    const { name } = attraction;

    const duration = differenceInSeconds(new Date(end), new Date(start));

    return { duration, name };
  });
}

export function toLate(date, endTime) {
  const hours = getHours(date);
  const minutes = getMinutes(date);

  return (
    hours > endTime.hours ||
    (hours === endTime.hours && minutes > endTime.minutes)
  );
}

export function getNextDayEarliestTime(date, startTime) {
  const { hours, minutes } = startTime;
  return setMinutes(setHours(addDays(date, 1), hours), minutes);
}
