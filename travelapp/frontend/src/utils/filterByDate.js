import { isSameDay } from 'date-fns';
import { parseDate } from './parseDate';

export function filterByDate(items, dateString) {
  const parsedDate = parseDate(dateString, 'dd.MM.yyyy');
  return items.filter((item) =>
    isSameDay(new Date(item.start_date), parsedDate)
  );
}
