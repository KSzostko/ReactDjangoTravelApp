import { getTravelDays } from 'utils';

it('returns an array with one date when the staring and the eding date are the same', () => {
  // 27th May 2020
  const startDate = new Date(2020, 4, 27);

  const expected = ['27.05.2020'];
  const result = getTravelDays(startDate, startDate);

  expect(result).toEqual(expected);
});

it('returns an array with every day of the period', () => {
  // 28th August 2020
  const startDate = new Date(2020, 7, 28);
  // 5th September 2020
  const endDate = new Date(2020, 8, 5);

  const expected = [
    '28.08.2020',
    '29.08.2020',
    '30.08.2020',
    '31.08.2020',
    '01.09.2020',
    '02.09.2020',
    '03.09.2020',
    '04.09.2020',
    '05.09.2020',
  ];
  const result = getTravelDays(startDate, endDate);

  expect(result).toEqual(expected);
});

it('returns an array with adjusted year when December has ended', () => {
  // 28th December 2020
  const startDate = new Date(2020, 11, 28);
  // 5th January 2021
  const endDate = new Date(2021, 0, 5);

  const expected = [
    '28.12.2020',
    '29.12.2020',
    '30.12.2020',
    '31.12.2020',
    '01.01.2021',
    '02.01.2021',
    '03.01.2021',
    '04.01.2021',
    '05.01.2021',
  ];
  const result = getTravelDays(startDate, endDate);

  expect(result).toEqual(expected);
});

it('returns an array when date are passed as string with the DD-MM-YYYY format', () => {
  // 28th December 2020
  const startDate = '2020-12-28';
  // 5th January 2021
  const endDate = '2021-01-05';

  const expected = [
    '28.12.2020',
    '29.12.2020',
    '30.12.2020',
    '31.12.2020',
    '01.01.2021',
    '02.01.2021',
    '03.01.2021',
    '04.01.2021',
    '05.01.2021',
  ];
  const result = getTravelDays(startDate, endDate);

  expect(result).toEqual(expected);
});
