import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/travels';

const create = (travelData) =>
  axios
    .post(BASE_URL, travelData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
    .then(({ data }) => data)
    .catch(({ response }) => Promise.reject(response));

export default { create };
