import { notification } from 'antd';

export const formatTime = (timeString) => {
  const [hours, minutes] = timeString
    .split(':')
    .map((e) => (Number.isNaN(parseInt(e)) ? 0 : parseInt(e)));

  /* eslint-disable */
  return `
  ${hours <= 9 ? '0' : ''}${hours}:${minutes <= 9 ? '0' : ''}${minutes}`;
  /* eslint-enable */
};

export function displayError(error) {
  notification.error({
    message: 'Wystąpił błąd',
    description: error,
  });
}

export function displaySuccess(message) {
  notification.success({
    message: 'Operacja przebiegła pomyślnie',
    description: message,
  });
}
