import { message } from 'antd';

const fileTypes = ['image/png', 'image/jpeg'];

export function validFile(file) {
  if (file.size > 1024 * 1024 * 10) {
    message.error('Zdjęcie musi ważyć mniej niż 10MB');
    return false;
  }

  if (!fileTypes.includes(file.type)) {
    message.error('Niepoprawny format zdjęcia');
    return false;
  }

  return true;
}
