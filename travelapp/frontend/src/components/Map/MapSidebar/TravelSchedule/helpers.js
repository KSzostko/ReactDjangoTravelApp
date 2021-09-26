import { notification } from 'antd';
import { formatHour } from 'utils';

export function showErroMessage(error) {
  notification.error({
    message: 'Wystąpił błąd',
    description: error,
  });
}

export function calculateTime(prevStop, routeData, latest = false) {
  const dateToFormat = !latest ? prevStop.end_date : prevStop.start_date;
  const [hours, minutes] = formatHour(dateToFormat)
    .split(':')
    .map((item) => {
      const res = parseInt(item);
      return Number.isNaN(res) ? 0 : res;
    });

  const totalSeconds = !latest
    ? hours * 3600 + minutes * 60 + routeData.travel_time
    : hours * 3600 + minutes * 60 - routeData.travel_time;
  const totalHours = Math.floor(totalSeconds / 3600);
  const totalMinutes = Math.floor((totalSeconds - totalHours * 3600) / 60);

  return {
    hours: totalHours,
    minutes: totalMinutes,
  };
}
