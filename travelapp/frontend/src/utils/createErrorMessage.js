export function createErrorMessage(errorObj) {
  if (!errorObj) return '';
  return Object.values(errorObj).toString();
}
