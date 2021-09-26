import { notification } from 'antd';
import { formatHour } from 'utils';

export function showErroMessage(error) {
  notification.error({
    message: 'Wystąpił błąd',
    description: error,
  });
}

export function calculateEarliestTime(prevStop, routeData) {
  const [hours, minutes] = formatHour(prevStop.end_date)
    .split(':')
    .map((item) => {
      const res = parseInt(item);
      return Number.isNaN(res) ? 0 : res;
    });

  const totalSeconds = hours * 3600 + minutes * 60 + routeData.travel_time;
  const totalHours = Math.floor(totalSeconds / 3600);
  const totalMinutes = Math.floor((totalSeconds - totalHours * 3600) / 60);

  return {
    hours: totalHours,
    minutes: totalMinutes,
  };
}
