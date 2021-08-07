export function createTimeString(seconds) {
  const hours = parseInt(seconds / 3600);
  const minutes = parseInt((seconds - hours * 3600) / 60);
  const timeSeconds = parseInt(seconds - hours * 3600 - minutes * 60);

  return `${hours < 9 ? '0' : ''}${hours}h 
          ${minutes < 9 ? '0' : ''}${minutes}m
          ${timeSeconds < 9 ? '0' : ''}${timeSeconds}s`;
}
