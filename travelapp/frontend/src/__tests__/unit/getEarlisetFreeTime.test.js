import { getEarlisetFreeTime } from 'utils';

const timestamps = [
  {
    start_date: new Date('2020-08-22T05:24:55'),
    end_date: new Date('2020-08-22T07:35:55'),
  },
  {
    start_date: new Date('2021-08-22T05:24:55'),
    end_date: new Date('2021-08-22T05:25:55'),
  },
  {
    start_date: new Date('2020-08-22T12:37:37'),
    end_date: new Date('2020-08-22T12:55:37'),
  },
  {
    start_date: new Date('2020-07-22T23:24:55'),
    end_date: new Date('2020-07-22T23:34:55'),
  },
  {
    start_date: new Date('2020-08-22T01:00:00'),
    end_date: new Date('2020-08-22T04:15:00'),
  },
  {
    start_date: new Date('2020-12-22T01:00:00'),
    end_date: new Date('2020-12-22T01:01:00'),
  },
];

it('returns an object with null properties if there are no timestamps in the given day', () => {
  const expected = { hours: null, minutes: null };
  const result = getEarlisetFreeTime(timestamps, '11.01.1998', 12);

  expect(result).toEqual(expected);
});

it('returns an earliset free hour from the given day when travel time is not specified', () => {
  const expected = { hours: 12, minutes: 55 };
  const result = getEarlisetFreeTime(timestamps, '22.08.2020');

  expect(result).toEqual(expected);
});

it('returns an earliset free hour from the given day when travel time is specified', () => {
  const expected = { hours: 13, minutes: 0 };
  const result = getEarlisetFreeTime(timestamps, '22.08.2020', 320);

  expect(result).toEqual(expected);
});
