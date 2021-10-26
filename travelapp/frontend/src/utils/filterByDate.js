import { isSameDay, compareAsc } from 'date-fns';
import { parseDate } from './parseDate';

export function filterByDate(items, dateString, dateFormat = 'dd.MM.yyyy') {
  const sortedDates = [...items];
  sortedDates.sort((a, b) =>
    compareAsc(new Date(a.start_date), new Date(b.start_date))
  );
  const parsedDate = parseDate(dateString, dateFormat);

  return sortedDates.filter((item) =>
    isSameDay(new Date(item.start_date), parsedDate)
  );
}
