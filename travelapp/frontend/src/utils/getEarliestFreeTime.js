import { add, getHours, getMinutes } from 'date-fns';
import { filterByDate } from './filterByDate';

// travel time is in seconds
export function getEarlisetFreeTime(stops, day, travelTime = 0) {
  const choosenDayStops = filterByDate(stops, day);
  if (choosenDayStops.length === 0) {
    return {
      hours: null,
      minutes: null,
    };
  }

  const latestStop = choosenDayStops[choosenDayStops.length - 1];
  const finishTime = add(new Date(latestStop.end_date), {
    seconds: travelTime,
  });

  const hours = getHours(new Date(finishTime));
  const minutes = getMinutes(new Date(finishTime));
  return { hours, minutes };
}
