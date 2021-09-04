import { filterByDate } from 'utils';

const timestamps = [
  { start_date: new Date('2020-08-22T05:24:55') },
  { start_date: new Date('2021-08-22T05:24:55') },
  { start_date: new Date('2020-08-22T12:37:37') },
  { start_date: new Date('2020-07-22T23:24:55') },
  { start_date: new Date('2020-08-22T01:00:00') },
  { start_date: new Date('2020-12-22T01:00:00') },
];

it('returns an empty array if no timestamp matches a given day', () => {
  const expected = [];
  const result = filterByDate(timestamps, '22.12.2021');

  expect(result).toEqual(expected);
});

it('returns sorted timestamps only from the given day', () => {
  const expected = [
    { start_date: new Date('2020-08-22T01:00:00') },
    { start_date: new Date('2020-08-22T05:24:55') },
    { start_date: new Date('2020-08-22T12:37:37') },
  ];
  const result = filterByDate(timestamps, '22.08.2020');

  expect(result).toEqual(expected);
});
