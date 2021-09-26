import { setHours, setMinutes } from 'date-fns';

export function setTimeForDate(date, hours, minutes) {
  return setHours(setMinutes(new Date(date), minutes), hours);
}
