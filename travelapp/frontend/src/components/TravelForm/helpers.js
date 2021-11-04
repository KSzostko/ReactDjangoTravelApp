import moment from 'moment';
import { parseDate } from 'utils';

export function getInitialFormValues(currentTravel, editMode) {
  const startDate = moment(currentTravel?.start_date, 'YYYY-MM-DD');
  const endDate = moment(currentTravel?.end_date, 'YYYY-MM-DD');

  const initialFormValues = {
    name: currentTravel?.name || '',
    short_description: currentTravel?.short_description || '',
    description: currentTravel?.description || '',
  };

  if (editMode) {
    initialFormValues.start = startDate;
    initialFormValues.end = endDate;
  }

  return initialFormValues;
}

export function getDateString(date) {
  return parseDate(date.toDate(), 'yyyy-MM-dd');
}
