import { getHours, getMinutes } from 'date-fns';

export const tooltipText =
  'Jeśli początek kolejnego punktu podróży nie będzie mieścił się w wybranym przedziale, zostanie przeniesiony on na kolejny dzień i rozpoczenie się od wybranej startowej godziny.';

export function prepareWaypointsData(stopsList) {
  const result = [];

  stopsList.forEach(({ attraction }) => {
    const { name, lat, lng } = attraction;
    result.push({ name, lat, lng });
  });

  return result;
}

export function prepareTimeRange(timeRange) {
  const adjustedTimeRange = timeRange.map((dateItem) => {
    const date = dateItem.toDate();
    const hours = getHours(date);
    const minutes = getMinutes(date);

    return { hours, minutes };
  });

  return adjustedTimeRange;
}
