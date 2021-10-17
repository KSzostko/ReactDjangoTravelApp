import { parse, format as formatDate } from 'date-fns';
import { pl } from 'date-fns/locale';

export const parseDate = (date, format) => {
  if (date instanceof Date) {
    return formatDate(date, format, {
      locale: pl,
    });
  }

  return parse(date, format, new Date(), {
    locale: pl,
  });
};
