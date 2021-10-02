// this ensure that we will get token dynamically, not only after first compilation
// if we were to declare it in a form of variable
export const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Token ${localStorage.getItem('token')}`,
});
