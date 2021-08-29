import { parse } from 'date-fns';
import { pl } from 'date-fns/locale';

export const parseDate = (date, format) =>
  parse(date, format, new Date(), {
    locale: pl,
  });
